const fs = require('fs');
const spec = JSON.parse(fs.readFileSync('openapi.json', 'utf-8'));

// Build tag -> operations map
const tagOps = {};
Object.entries(spec.paths).forEach(([path, methods]) => {
	Object.entries(methods).forEach(([method, op]) => {
		if (!op.tags) return;
		op.tags.forEach(tag => {
			if (!tagOps[tag]) tagOps[tag] = [];
			// Collect path params from $ref or inline
			const pathParams = (op.parameters || []).filter(p => {
				if (p['$ref']) {
					const refName = p['$ref'].split('/').pop();
					const resolved = spec.components.parameters[refName];
					return resolved && resolved.in === 'path';
				}
				return p.in === 'path';
			}).map(p => {
				if (p['$ref']) {
					const refName = p['$ref'].split('/').pop();
					return spec.components.parameters[refName];
				}
				return p;
			});

			// Collect query params
			const queryParams = (op.parameters || []).filter(p => {
				if (p['$ref']) {
					const refName = p['$ref'].split('/').pop();
					const resolved = spec.components.parameters[refName];
					return resolved && resolved.in === 'query';
				}
				return p.in === 'query';
			}).map(p => {
				if (p['$ref']) {
					const refName = p['$ref'].split('/').pop();
					return spec.components.parameters[refName];
				}
				return p;
			});

			tagOps[tag].push({
				path,
				method: method.toUpperCase(),
				summary: op.summary || '',
				description: op.description || op.summary || '',
				pathParams,
				queryParams,
				hasBody: !!op.requestBody,
				requestBody: op.requestBody || null,
			});
		});
	});
});

// Helpers
function toCamelCase(str) {
	const words = str.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/);
	return words
		.map((w, i) => {
			if (i === 0) return w.toLowerCase();
			return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
		})
		.join('');
}

function toResourceValue(tag) {
	return toCamelCase(tag);
}

function escapeStr(s) {
	return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// Truncate description to first sentence if too long
function shortDesc(s) {
	if (!s) return '';
	let d = s.split('\n')[0].trim();
	if (d.length > 200) d = d.substring(0, 197) + '...';
	return d;
}

// Determine n8n field type from OpenAPI schema
function getFieldType(schema) {
	if (!schema) return 'string';
	if (schema.type === 'integer' || schema.type === 'number') return 'number';
	if (schema.type === 'boolean') return 'boolean';
	if (schema.type === 'array') return 'json';
	if (schema.type === 'object') return 'json';
	return 'string';
}

// Resolve $ref in schemas
function resolveRef(ref) {
	if (!ref) return null;
	const parts = ref.replace('#/', '').split('/');
	let obj = spec;
	for (const p of parts) obj = obj[p];
	return obj;
}

// Get body schema properties
function getBodyProperties(requestBody) {
	if (!requestBody) return null;
	const content = requestBody.content;
	if (!content) return null;
	const jsonContent = content['application/json'];
	if (!jsonContent || !jsonContent.schema) return null;
	let schema = jsonContent.schema;
	if (schema['$ref']) schema = resolveRef(schema['$ref']);
	if (!schema) return null;
	if (schema.properties) return { properties: schema.properties, required: schema.required || [] };
	return null;
}

// Sort tags for consistent output
const sortedTags = Object.keys(tagOps).sort();

// Build resources array
const resources = sortedTags.map(tag => ({
	displayName: tag,
	value: toResourceValue(tag),
	ops: tagOps[tag],
}));

// Exclude SSE streaming endpoints
const excludedPaths = [
	'/api/instances/{instanceID}/rss/events',
	'/api/logs/stream',
];

// Start building the file
let out = '';

out += `import type {\n`;
out += `\tIExecuteFunctions,\n`;
out += `\tINodeExecutionData,\n`;
out += `\tINodeType,\n`;
out += `\tINodeTypeDescription,\n`;
out += `\tIDataObject,\n`;
out += `\tIHttpRequestMethods,\n`;
out += `} from 'n8n-workflow';\n\n`;

out += `export class Qui implements INodeType {\n`;
out += `\tdescription: INodeTypeDescription = {\n`;
out += `\t\tdisplayName: 'QUI',\n`;
out += `\t\tname: 'qui',\n`;
out += `\t\ticon: 'file:qui.svg',\n`;
out += `\t\tgroup: ['transform'],\n`;
out += `\t\tversion: 1,\n`;
out += `\t\tsubtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',\n`;
out += `\t\tdescription: 'Interact with the QUI API to manage multiple qBittorrent instances',\n`;
out += `\t\tdefaults: {\n`;
out += `\t\t\tname: 'QUI',\n`;
out += `\t\t},\n`;
out += `\t\tinputs: ['main'],\n`;
out += `\t\toutputs: ['main'],\n`;
out += `\t\tcredentials: [\n`;
out += `\t\t\t{\n`;
out += `\t\t\t\tname: 'quiApi',\n`;
out += `\t\t\t\trequired: true,\n`;
out += `\t\t\t},\n`;
out += `\t\t],\n`;
out += `\t\tproperties: [\n`;

// Resource property
out += `\t\t\t{\n`;
out += `\t\t\t\tdisplayName: 'Resource',\n`;
out += `\t\t\t\tname: 'resource',\n`;
out += `\t\t\t\ttype: 'options',\n`;
out += `\t\t\t\tnoDataExpression: true,\n`;
out += `\t\t\t\toptions: [\n`;
resources.forEach(r => {
	out += `\t\t\t\t\t{\n`;
	out += `\t\t\t\t\t\tname: '${escapeStr(r.displayName)}',\n`;
	out += `\t\t\t\t\t\tvalue: '${r.value}',\n`;
	out += `\t\t\t\t\t},\n`;
});
out += `\t\t\t\t],\n`;
out += `\t\t\t\tdefault: '${resources[0].value}',\n`;
out += `\t\t\t},\n`;

// Operation properties per resource
resources.forEach(r => {
	const ops = r.ops.filter(op => !excludedPaths.includes(op.path));
	out += `\t\t\t{\n`;
	out += `\t\t\t\tdisplayName: 'Operation',\n`;
	out += `\t\t\t\tname: 'operation',\n`;
	out += `\t\t\t\ttype: 'options',\n`;
	out += `\t\t\t\tnoDataExpression: true,\n`;
	out += `\t\t\t\tdisplayOptions: {\n`;
	out += `\t\t\t\t\tshow: {\n`;
	out += `\t\t\t\t\t\tresource: ['${r.value}'],\n`;
	out += `\t\t\t\t\t},\n`;
	out += `\t\t\t\t},\n`;
	out += `\t\t\t\toptions: [\n`;
	// Deduplicate operation names within resource
	const usedNames = {};
	ops.forEach(op => {
		let opValue = toCamelCase(op.summary);
		if (usedNames[opValue]) {
			opValue += op.method.charAt(0).toUpperCase() + op.method.slice(1).toLowerCase();
		}
		usedNames[opValue] = true;
		op._opValue = opValue;

		out += `\t\t\t\t\t{\n`;
		out += `\t\t\t\t\t\tname: '${escapeStr(op.summary)}',\n`;
		out += `\t\t\t\t\t\tvalue: '${opValue}',\n`;
		out += `\t\t\t\t\t\tdescription: '${escapeStr(shortDesc(op.description))}',\n`;
		out += `\t\t\t\t\t\taction: '${escapeStr(op.summary.toLowerCase())}',\n`;
		out += `\t\t\t\t\t},\n`;
	});
	out += `\t\t\t\t],\n`;
	out += `\t\t\t\tdefault: '${ops[0]._opValue}',\n`;
	out += `\t\t\t},\n`;
});

// Now emit individual fields (path params, query params, body) per operation
resources.forEach(r => {
	const ops = r.ops.filter(op => !excludedPaths.includes(op.path));
	ops.forEach(op => {
		// Path parameters
		op.pathParams.forEach(p => {
			const fieldType = getFieldType(p.schema);
			out += `\t\t\t{\n`;
			out += `\t\t\t\tdisplayName: '${escapeStr(p.description || p.name)}',\n`;
			out += `\t\t\t\tname: '${p.name}',\n`;
			out += `\t\t\t\ttype: '${fieldType}',\n`;
			out += `\t\t\t\trequired: true,\n`;
			out += `\t\t\t\tdefault: ${fieldType === 'number' ? '0' : "''"},\n`;
			out += `\t\t\t\tdisplayOptions: {\n`;
			out += `\t\t\t\t\tshow: {\n`;
			out += `\t\t\t\t\t\tresource: ['${r.value}'],\n`;
			out += `\t\t\t\t\t\toperation: ['${op._opValue}'],\n`;
			out += `\t\t\t\t\t},\n`;
			out += `\t\t\t\t},\n`;
			if (p.description) {
				out += `\t\t\t\tdescription: '${escapeStr(p.description)}',\n`;
			}
			out += `\t\t\t},\n`;
		});

		// Query parameters
		op.queryParams.forEach(p => {
			const fieldType = getFieldType(p.schema);
			const isRequired = p.required || false;
			out += `\t\t\t{\n`;
			out += `\t\t\t\tdisplayName: '${escapeStr(p.description || p.name)}',\n`;
			out += `\t\t\t\tname: '${p.name}',\n`;
			out += `\t\t\t\ttype: '${fieldType}',\n`;
			if (isRequired) out += `\t\t\t\trequired: true,\n`;
			let defaultVal;
			if (p.schema && p.schema.default !== undefined) {
				defaultVal = JSON.stringify(p.schema.default);
			} else {
				defaultVal = fieldType === 'number' ? '0' : fieldType === 'boolean' ? 'false' : "''";
			}
			out += `\t\t\t\tdefault: ${defaultVal},\n`;
			out += `\t\t\t\tdisplayOptions: {\n`;
			out += `\t\t\t\t\tshow: {\n`;
			out += `\t\t\t\t\t\tresource: ['${r.value}'],\n`;
			out += `\t\t\t\t\t\toperation: ['${op._opValue}'],\n`;
			out += `\t\t\t\t\t},\n`;
			out += `\t\t\t\t},\n`;
			if (p.description) {
				out += `\t\t\t\tdescription: '${escapeStr(shortDesc(p.description))}',\n`;
			}
			out += `\t\t\t},\n`;
		});

		// Body as JSON field for operations with request body
		if (op.hasBody) {
			const bodyInfo = getBodyProperties(op.requestBody);
			if (bodyInfo && Object.keys(bodyInfo.properties).length <= 8) {
				// Emit individual fields for small bodies
				Object.entries(bodyInfo.properties).forEach(([propName, propSchema]) => {
					if (propSchema['$ref']) propSchema = resolveRef(propSchema['$ref']);
					const fieldType = getFieldType(propSchema);
					const isRequired = bodyInfo.required.includes(propName);
					const desc = propSchema.description || '';
					out += `\t\t\t{\n`;
					out += `\t\t\t\tdisplayName: '${escapeStr(propName.charAt(0).toUpperCase() + propName.slice(1).replace(/([A-Z])/g, ' $1').trim())}',\n`;
					out += `\t\t\t\tname: '${propName}',\n`;
					out += `\t\t\t\ttype: '${fieldType}',\n`;
					if (isRequired) out += `\t\t\t\trequired: true,\n`;
					let dv;
					if (propSchema.default !== undefined) {
						dv = JSON.stringify(propSchema.default);
					} else {
						dv = fieldType === 'number' ? '0' : fieldType === 'boolean' ? 'false' : fieldType === 'json' ? "''" : "''";
					}
					out += `\t\t\t\tdefault: ${dv},\n`;
					out += `\t\t\t\tdisplayOptions: {\n`;
					out += `\t\t\t\t\tshow: {\n`;
					out += `\t\t\t\t\t\tresource: ['${r.value}'],\n`;
					out += `\t\t\t\t\t\toperation: ['${op._opValue}'],\n`;
					out += `\t\t\t\t\t},\n`;
					out += `\t\t\t\t},\n`;
					if (desc) {
						out += `\t\t\t\tdescription: '${escapeStr(shortDesc(desc))}',\n`;
					}
					out += `\t\t\t},\n`;
				});
			} else {
				// Use a single JSON body field for complex schemas
				out += `\t\t\t{\n`;
				out += `\t\t\t\tdisplayName: 'Body',\n`;
				out += `\t\t\t\tname: 'body',\n`;
				out += `\t\t\t\ttype: 'json',\n`;
				out += `\t\t\t\tdefault: '{}',\n`;
				out += `\t\t\t\tdisplayOptions: {\n`;
				out += `\t\t\t\t\tshow: {\n`;
				out += `\t\t\t\t\t\tresource: ['${r.value}'],\n`;
				out += `\t\t\t\t\t\toperation: ['${op._opValue}'],\n`;
				out += `\t\t\t\t\t},\n`;
				out += `\t\t\t\t},\n`;
				out += `\t\t\t\tdescription: 'JSON request body',\n`;
				out += `\t\t\t},\n`;
			}
		}
	});
});

out += `\t\t],\n`;
out += `\t};\n\n`;

// Execute method
out += `\tasync execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {\n`;
out += `\t\tconst items = this.getInputData();\n`;
out += `\t\tconst returnData: INodeExecutionData[] = [];\n`;
out += `\t\tconst resource = this.getNodeParameter('resource', 0) as string;\n`;
out += `\t\tconst operation = this.getNodeParameter('operation', 0) as string;\n`;
out += `\t\tconst credentials = await this.getCredentials('quiApi');\n`;
out += `\t\tconst baseUrl = (credentials.baseUrl as string).replace(/\\/$/, '');\n\n`;

out += `\t\tfor (let i = 0; i < items.length; i++) {\n`;
out += `\t\t\ttry {\n`;
out += `\t\t\t\tlet endpoint = '';\n`;
out += `\t\t\t\tlet method: IHttpRequestMethods = 'GET';\n`;
out += `\t\t\t\tlet body: object | undefined;\n`;
out += `\t\t\t\tconst qs: Record<string, string | number | boolean> = {};\n\n`;

// Build switch for each resource+operation
let firstResource = true;
resources.forEach(r => {
	const ops = r.ops.filter(op => !excludedPaths.includes(op.path));
	out += `\t\t\t\t${firstResource ? 'if' : '} else if'} (resource === '${r.value}') {\n`;
	firstResource = false;

	let firstOp = true;
	ops.forEach(op => {
		out += `\t\t\t\t\t${firstOp ? 'if' : '} else if'} (operation === '${op._opValue}') {\n`;
		firstOp = false;

		// Build endpoint with path param substitution
		let endpointStr = op.path.replace(/^\/api\//, '');
		const pathParamNames = op.pathParams.map(p => p.name);
		pathParamNames.forEach(pn => {
			out += `\t\t\t\t\t\tconst ${pn} = this.getNodeParameter('${pn}', i) as ${op.pathParams.find(p=>p.name===pn).schema.type === 'integer' ? 'number' : 'string'};\n`;
		});

		// Replace {param} in endpoint
		let epLine = `'${endpointStr}'`;
		pathParamNames.forEach(pn => {
			epLine = epLine.replace(`{${pn}}`, `' + encodeURIComponent(${pn}) + '`);
		});
		// Clean up empty concatenations
		epLine = epLine.replace(/ \+ ''$/, '').replace(/^'' \+ /, '');

		out += `\t\t\t\t\t\tendpoint = ${epLine};\n`;
		out += `\t\t\t\t\t\tmethod = '${op.method}';\n`;

		// Query params
		op.queryParams.forEach(qp => {
			const ft = getFieldType(qp.schema);
			const tsType = ft === 'number' ? 'number' : ft === 'boolean' ? 'boolean' : 'string';
			out += `\t\t\t\t\t\tconst ${qp.name}Param = this.getNodeParameter('${qp.name}', i, ${ft === 'number' ? '0' : ft === 'boolean' ? 'false' : "''"}) as ${tsType};\n`;
			if (ft === 'string') {
				out += `\t\t\t\t\t\tif (${qp.name}Param) qs['${qp.name}'] = ${qp.name}Param;\n`;
			} else {
				out += `\t\t\t\t\t\tqs['${qp.name}'] = ${qp.name}Param;\n`;
			}
		});

		// Body
		if (op.hasBody) {
			const bodyInfo = getBodyProperties(op.requestBody);
			if (bodyInfo && Object.keys(bodyInfo.properties).length <= 8) {
				out += `\t\t\t\t\t\tbody = {\n`;
				Object.keys(bodyInfo.properties).forEach(propName => {
					let propSchema = bodyInfo.properties[propName];
					if (propSchema['$ref']) propSchema = resolveRef(propSchema['$ref']);
					const ft = getFieldType(propSchema);
					const tsType = ft === 'number' ? 'number' : ft === 'boolean' ? 'boolean' : ft === 'json' ? 'object' : 'string';
					const defaultVal = ft === 'number' ? '0' : ft === 'boolean' ? 'false' : "''";
					if (ft === 'json') {
						out += `\t\t\t\t\t\t\t${propName}: this.getNodeParameter('${propName}', i, '') as ${tsType},\n`;
					} else {
						out += `\t\t\t\t\t\t\t${propName}: this.getNodeParameter('${propName}', i, ${defaultVal}) as ${tsType},\n`;
					}
				});
				out += `\t\t\t\t\t\t};\n`;
			} else {
				out += `\t\t\t\t\t\tconst bodyJson = this.getNodeParameter('body', i, '{}') as string;\n`;
				out += `\t\t\t\t\t\tbody = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;\n`;
			}
		}

		out += `\n`;
	});
	if (ops.length > 0) {
		out += `\t\t\t\t\t}\n`;
	}
});
if (resources.length > 0) {
	out += `\t\t\t\t}\n\n`;
}

// Make the request
out += `\t\t\t\tconst options = {\n`;
out += `\t\t\t\t\tmethod,\n`;
out += `\t\t\t\t\turl: \`\${baseUrl}/api/\${endpoint}\`,\n`;
out += `\t\t\t\t\theaders: {\n`;
out += `\t\t\t\t\t\t'X-API-Key': credentials.apiKey as string,\n`;
out += `\t\t\t\t\t\t'Content-Type': 'application/json',\n`;
out += `\t\t\t\t\t},\n`;
out += `\t\t\t\t\tbody,\n`;
out += `\t\t\t\t\tqs,\n`;
out += `\t\t\t\t\tjson: true,\n`;
out += `\t\t\t\t};\n\n`;

out += `\t\t\t\tconst response = await this.helpers.httpRequest(options);\n\n`;
out += `\t\t\t\tif (Array.isArray(response)) {\n`;
out += `\t\t\t\t\tfor (const item of response) {\n`;
out += `\t\t\t\t\t\treturnData.push({ json: item as IDataObject });\n`;
out += `\t\t\t\t\t}\n`;
out += `\t\t\t\t} else if (response !== null && response !== undefined) {\n`;
out += `\t\t\t\t\treturnData.push({ json: response as IDataObject });\n`;
out += `\t\t\t\t} else {\n`;
out += `\t\t\t\t\treturnData.push({ json: { success: true } });\n`;
out += `\t\t\t\t}\n`;
out += `\t\t\t} catch (error) {\n`;
out += `\t\t\t\tif (this.continueOnFail()) {\n`;
out += `\t\t\t\t\treturnData.push({ json: { error: (error as Error).message } });\n`;
out += `\t\t\t\t\tcontinue;\n`;
out += `\t\t\t\t}\n`;
out += `\t\t\t\tthrow error;\n`;
out += `\t\t\t}\n`;
out += `\t\t}\n\n`;
out += `\t\treturn [returnData];\n`;
out += `\t}\n`;
out += `}\n`;

fs.writeFileSync('nodes/qui/qui.node.ts', out);
console.log('Generated nodes/qui/qui.node.ts (' + out.split('\n').length + ' lines)');
