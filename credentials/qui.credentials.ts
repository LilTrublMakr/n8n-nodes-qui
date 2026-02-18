import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class QuiApi implements ICredentialType {
	name = 'quiApi';

	displayName = 'QUI API';

	documentationUrl = 'https://github.com/autobrr/qui';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'https://qui.example.xyz',
			description: 'The base URL of your QUI instance (without /api/)',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			placeholder: 'Your 64-character API key',
			description: 'The API key for authenticating with the QUI API. A 64-character lowercase hexadecimal string.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl.replace(/\\/$/, "")}}/api/',
			url: 'auth/me',
			method: 'GET',
		},
	};
}
