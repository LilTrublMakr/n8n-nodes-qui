/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-description-boolean-without-whether */
/* eslint-disable n8n-nodes-base/node-param-resource-with-plural-option */
/* eslint-disable n8n-nodes-base/node-param-description-wrong-for-limit */
/* eslint-disable n8n-nodes-base/node-param-description-identical-to-display-name */
import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class Qui implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'QUI',
		name: 'qui',
		icon: 'file:../../icons/qui_icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the QUI API to manage multiple qBittorrent instances',
		defaults: {
			name: 'QUI',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		credentials: [
			{
				name: 'quiApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'API Keys',
						value: 'apiKeys',
					},
					{
						name: 'ARR Integrations',
						value: 'arrIntegrations',
					},
					{
						name: 'Authentication',
						value: 'authentication',
					},
					{
						name: 'Backups',
						value: 'backups',
					},
					{
						name: 'Categories',
						value: 'categories',
					},
					{
						name: 'Client API Keys',
						value: 'clientApiKeys',
					},
					{
						name: 'Cross-Seed',
						value: 'crossseed',
					},
					{
						name: 'Dir Scan',
						value: 'dirScan',
					},
					{
						name: 'External Programs',
						value: 'externalPrograms',
					},
					{
						name: 'Instances',
						value: 'instances',
					},
					{
						name: 'Licenses',
						value: 'licenses',
					},
					{
						name: 'Orphan Scan',
						value: 'orphanScan',
					},
					{
						name: 'RSS',
						value: 'rss',
					},
					{
						name: 'System',
						value: 'system',
					},
					{
						name: 'Tags',
						value: 'tags',
					},
					{
						name: 'Torrent Details',
						value: 'torrentDetails',
					},
					{
						name: 'Torrents',
						value: 'torrents',
					},
					{
						name: 'Tracker Icons',
						value: 'trackerIcons',
					},
					{
						name: 'Trackers',
						value: 'trackers',
					},
				],
				default: 'apiKeys',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['apiKeys'],
					},
				},
				options: [
					{
						name: 'List API Keys',
						value: 'listApiKeys',
						description: 'Get all API keys for the current user',
						action: 'List api keys',
					},
					{
						name: 'Create API Key',
						value: 'createApiKey',
						description: 'Generate a new API key',
						action: 'Create api key',
					},
					{
						name: 'Delete API Key',
						value: 'deleteApiKey',
						description: 'Revoke an API key',
						action: 'Delete api key',
					},
				],
				default: 'listApiKeys',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
					},
				},
				options: [
					{
						name: 'List ARR Instances',
						value: 'listArrInstances',
						description: 'Get all configured Sonarr/Radarr instances',
						action: 'List arr instances',
					},
					{
						name: 'Create ARR Instance',
						value: 'createArrInstance',
						description: 'Add a new Sonarr or Radarr instance configuration',
						action: 'Create arr instance',
					},
					{
						name: 'Delete ARR Instance',
						value: 'deleteArrInstance',
						description: 'Delete an ARR instance configuration',
						action: 'Delete arr instance',
					},
					{
						name: 'Get ARR Instance',
						value: 'getArrInstance',
						description: 'Get a single Sonarr/Radarr instance by ID',
						action: 'Get arr instance',
					},
					{
						name: 'Update ARR Instance',
						value: 'updateArrInstance',
						description: 'Update an existing Sonarr/Radarr instance configuration',
						action: 'Update arr instance',
					},
					{
						name: 'Test ARR Instance',
						value: 'testArrInstance',
						description: 'Test connectivity to an existing ARR instance',
						action: 'Test arr instance',
					},
					{
						name: 'Resolve Title to External IDs',
						value: 'resolveTitleToExternalIds',
						description: 'Use configured ARR instances to resolve a title to external IDs (IMDb, TMDb, TVDb, TVMaze)',
						action: 'Resolve title to external ids',
					},
					{
						name: 'Test ARR Connection',
						value: 'testArrConnection',
						description: 'Test connectivity to an ARR instance before saving',
						action: 'Test arr connection',
					},
				],
				default: 'listArrInstances',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['authentication'],
					},
				},
				options: [
					{
						name: 'Change Password',
						value: 'changePassword',
						description: 'Change the current user\'s password',
						action: 'Change password',
					},
					{
						name: 'Check Setup Status',
						value: 'checkSetupStatus',
						description: 'Check if initial setup is required',
						action: 'Check setup status',
					},
					{
						name: 'Login',
						value: 'login',
						description: 'Authenticate with username and password',
						action: 'Login',
					},
					{
						name: 'Logout',
						value: 'logout',
						description: 'End the current session',
						action: 'Logout',
					},
					{
						name: 'Get Current User',
						value: 'getCurrentUser',
						description: 'Get information about the authenticated user',
						action: 'Get current user',
					},
					{
						name: 'Initial Setup',
						value: 'initialSetup',
						description: 'Create the initial admin user (only available before first user is created)',
						action: 'Initial setup',
					},
				],
				default: 'changePassword',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['backups'],
					},
				},
				options: [
					{
						name: 'Import Backup Manifest',
						value: 'importBackupManifest',
						description: 'Import a backup manifest file to create a new backup run record. This allows restoring backup metadata from a previously exported manifest.',
						action: 'Import backup manifest',
					},
					{
						name: 'Download Backup Archive',
						value: 'downloadBackupArchive',
						description: 'Download the backup archive for the specified backup run in the requested format',
						action: 'Download backup archive',
					},
					{
						name: 'Download Torrent File From Backup',
						value: 'downloadTorrentFileFromBackup',
						description: 'Download a specific torrent file from the backup archive',
						action: 'Download torrent file from backup',
					},
					{
						name: 'Execute Restore',
						value: 'executeRestore',
						description: 'Execute the restore plan for the specified backup run',
						action: 'Execute restore',
					},
					{
						name: 'Preview Restore Plan',
						value: 'previewRestorePlan',
						description: 'Build a restore plan for the specified backup run without applying any changes',
						action: 'Preview restore plan',
					},
				],
				default: 'importBackupManifest',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['categories'],
					},
				},
				options: [
					{
						name: 'Delete Categories',
						value: 'deleteCategories',
						description: 'Delete one or more categories',
						action: 'Delete categories',
					},
					{
						name: 'List Categories',
						value: 'listCategories',
						description: 'Get all categories',
						action: 'List categories',
					},
					{
						name: 'Create Category',
						value: 'createCategory',
						description: 'Create a new category',
						action: 'Create category',
					},
					{
						name: 'Edit Category',
						value: 'editCategory',
						description: 'Edit an existing category',
						action: 'Edit category',
					},
				],
				default: 'deleteCategories',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['clientApiKeys'],
					},
				},
				options: [
					{
						name: 'List Client API Keys',
						value: 'listClientApiKeys',
						description: 'Get all client API keys for external applications',
						action: 'List client api keys',
					},
					{
						name: 'Create Client API Key',
						value: 'createClientApiKey',
						description: 'Generate a new client API key for external applications',
						action: 'Create client api key',
					},
					{
						name: 'Delete Client API Key',
						value: 'deleteClientApiKey',
						description: 'Revoke a client API key',
						action: 'Delete client api key',
					},
				],
				default: 'listClientApiKeys',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['crossseed'],
					},
				},
				options: [
					{
						name: 'Add a Cross-Seed Torrent Provided by Autobrr',
						value: 'addACrossseedTorrentProvidedByAutobrr',
						description: 'Accepts a torrent file from autobrr, matches it against the requested instances, and adds it with alignment wherever a complete match exists. When `instanceIds` is omitted or empty, qui attempts to...',
						action: 'Add a cross seed torrent provided by autobrr',
					},
					{
						name: 'Get per-Instance Completion Settings',
						value: 'getPerInstanceCompletionSettings',
						description: 'Returns the cross-seed completion settings for a specific qBittorrent instance. These settings control automatic cross-seed searches when torrents complete on this instance.',
						action: 'Get per instance completion settings',
					},
					{
						name: 'Update per-Instance Completion Settings',
						value: 'updatePerInstanceCompletionSettings',
						description: 'Updates the cross-seed completion settings for a specific qBittorrent instance. These settings control automatic cross-seed searches when torrents complete on this instance.',
						action: 'Update per instance completion settings',
					},
					{
						name: 'Trigger Cross-Seed Automation Run',
						value: 'triggerCrossseedAutomationRun',
						description: 'Starts an on-demand automation pass',
						action: 'Trigger cross seed automation run',
					},
					{
						name: 'Cancel RSS Automation Run',
						value: 'cancelRssAutomationRun',
						description: 'Stops the currently running RSS automation run, if any',
						action: 'Cancel rss automation run',
					},
					{
						name: 'List Cross-Seed Automation Runs',
						value: 'listCrossseedAutomationRuns',
						description: 'Returns the most recent automation runs',
						action: 'List cross seed automation runs',
					},
					{
						name: 'Start a Cross-Seed Search Run',
						value: 'startACrossseedSearchRun',
						description: 'Starts a new cross-seed search automation run for the specified instance',
						action: 'Start a cross seed search run',
					},
					{
						name: 'Cancel Running Search',
						value: 'cancelRunningSearch',
						description: 'Cancels the currently running cross-seed search automation',
						action: 'Cancel running search',
					},
					{
						name: 'List Search Run History',
						value: 'listSearchRunHistory',
						description: 'Returns the history of cross-seed search automation runs for an instance',
						action: 'List search run history',
					},
					{
						name: 'Get Seeded Torrent Search Settings',
						value: 'getSeededTorrentSearchSettings',
						description: 'Returns the persisted defaults used by Seeded Torrent Search runs',
						action: 'Get seeded torrent search settings',
					},
					{
						name: 'Update Seeded Torrent Search Settings',
						value: 'updateSeededTorrentSearchSettings',
						description: 'Persists default filters and timing for Seeded Torrent Search runs',
						action: 'Update seeded torrent search settings',
					},
					{
						name: 'Get Search Run Status',
						value: 'getSearchRunStatus',
						description: 'Returns the current status of the cross-seed search automation',
						action: 'Get search run status',
					},
					{
						name: 'Get Cross-Seed Automation Settings',
						value: 'getCrossseedAutomationSettings',
						description: 'Retrieve the current automation configuration for cross-seeding',
						action: 'Get cross seed automation settings',
					},
					{
						name: 'Patch Cross-Seed Automation Settings',
						value: 'patchCrossseedAutomationSettings',
						description: 'Partially update automation, completion, or global cross-seed settings without overwriting unspecified fields',
						action: 'Patch cross seed automation settings',
					},
					{
						name: 'Update Cross-Seed Automation Settings',
						value: 'updateCrossseedAutomationSettings',
						description: 'Persist a new automation schedule and cross-seed preferences',
						action: 'Update cross seed automation settings',
					},
					{
						name: 'Get Cross-Seed Automation Status',
						value: 'getCrossseedAutomationStatus',
						description: 'Returns scheduler state, last run information, and next scheduled run',
						action: 'Get cross seed automation status',
					},
					{
						name: 'Analyze Torrent for Cross-Seed Search',
						value: 'analyzeTorrentForCrossseedSearch',
						description: 'Analyzes a torrent and returns information needed for cross-seed searching',
						action: 'Analyze torrent for cross seed search',
					},
					{
						name: 'Add Torrents Found via Cross-Seed Search',
						value: 'addTorrentsFoundViaCrossseedSearch',
						description: 'Downloads selected results and queues them for cross-seeding on the specified instance',
						action: 'Add torrents found via cross seed search',
					},
					{
						name: 'Get Async Filtering Status',
						value: 'getAsyncFilteringStatus',
						description: 'Returns the current async filtering progress for a torrent, including whether content filtering has completed',
						action: 'Get async filtering status',
					},
					{
						name: 'Find Local Cross-Seed Matches',
						value: 'findLocalCrossseedMatches',
						description: 'Find torrents across all qBittorrent instances that match the specified torrent (by content path, name, or release metadata)',
						action: 'Find local cross seed matches',
					},
					{
						name: 'Search Cross-Seed Candidates for a Torrent',
						value: 'searchCrossseedCandidatesForATorrent',
						description: 'Query configured Torznab indexers for releases matching an existing torrent',
						action: 'Search cross seed candidates for a torrent',
					},
					{
						name: 'Check if a Release Can Be Cross-Seeded (Autobrr Webhook)',
						value: 'checkIfAReleaseCanBeCrossseededAutobrrWebhook',
						description: 'Accepts release metadata from autobrr and checks if matching torrents exist on the requested instances (or all instances when no list is provided). The HTTP status describes whether the match is re...',
						action: 'Check if a release can be cross seeded autobrr webhook',
					},
					{
						name: 'Get Cross-Seed Status for Instance',
						value: 'getCrossseedStatusForInstance',
						description: 'Get cross-seed statistics and status for a specific qBittorrent instance',
						action: 'Get cross seed status for instance',
					},
				],
				default: 'addACrossseedTorrentProvidedByAutobrr',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['dirScan'],
					},
				},
				options: [
					{
						name: 'List Scan Directories',
						value: 'listScanDirectories',
						description: 'Returns all configured scan directories',
						action: 'List scan directories',
					},
					{
						name: 'Create Scan Directory',
						value: 'createScanDirectory',
						description: 'Creates a new scan directory configuration',
						action: 'Create scan directory',
					},
					{
						name: 'Delete Scan Directory',
						value: 'deleteScanDirectory',
						description: 'Deletes a scan directory configuration and all associated history',
						action: 'Delete scan directory',
					},
					{
						name: 'Get Scan Directory',
						value: 'getScanDirectory',
						description: 'Returns a scan directory by ID',
						action: 'Get scan directory',
					},
					{
						name: 'Update Scan Directory',
						value: 'updateScanDirectory',
						description: 'Partially updates a scan directory configuration',
						action: 'Update scan directory',
					},
					{
						name: 'List Directory Scan Files',
						value: 'listDirectoryScanFiles',
						description: 'Returns tracked files for a directory with optional status filtering',
						action: 'List directory scan files',
					},
					{
						name: 'Reset Directory Scan Progress',
						value: 'resetDirectoryScanProgress',
						description: 'Deletes tracked dir-scan file state for the directory so the next scan re-processes it',
						action: 'Reset directory scan progress',
					},
					{
						name: 'List Directory Scan Runs',
						value: 'listDirectoryScanRuns',
						description: 'Returns recent scan runs for a directory',
						action: 'List directory scan runs',
					},
					{
						name: 'List Directory Scan Run Injections',
						value: 'listDirectoryScanRunInjections',
						description: 'Returns injection attempts (added/failed) for a scan run',
						action: 'List directory scan run injections',
					},
					{
						name: 'Cancel a Directory Scan',
						value: 'cancelADirectoryScan',
						description: 'Cancels the currently running scan for the given directory, if any',
						action: 'Cancel a directory scan',
					},
					{
						name: 'Trigger a Directory Scan',
						value: 'triggerADirectoryScan',
						description: 'Starts a manual scan run for the given directory',
						action: 'Trigger a directory scan',
					},
					{
						name: 'Get Directory Scan Status',
						value: 'getDirectoryScanStatus',
						description: 'Returns the status of the active scan run or the most recent run (or idle)',
						action: 'Get directory scan status',
					},
					{
						name: 'Get Dir Scan Settings',
						value: 'getDirScanSettings',
						description: 'Returns the global directory scanner configuration',
						action: 'Get dir scan settings',
					},
					{
						name: 'Update Dir Scan Settings',
						value: 'updateDirScanSettings',
						description: 'Partially updates global directory scanner settings',
						action: 'Update dir scan settings',
					},
				],
				default: 'listScanDirectories',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
					},
				},
				options: [
					{
						name: 'List External Programs',
						value: 'listExternalPrograms',
						description: 'Get all configured external programs',
						action: 'List external programs',
					},
					{
						name: 'Create External Program',
						value: 'createExternalProgram',
						description: 'Add a new external program configuration',
						action: 'Create external program',
					},
					{
						name: 'Execute External Program',
						value: 'executeExternalProgram',
						description: 'Execute an external program for one or more torrents',
						action: 'Execute external program',
					},
					{
						name: 'Delete External Program',
						value: 'deleteExternalProgram',
						description: 'Delete an external program configuration',
						action: 'Delete external program',
					},
					{
						name: 'Update External Program',
						value: 'updateExternalProgram',
						description: 'Update an external program configuration',
						action: 'Update external program',
					},
				],
				default: 'listExternalPrograms',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['instances'],
					},
				},
				options: [
					{
						name: 'List Instances',
						value: 'listInstances',
						description: 'Get all configured qBittorrent instances',
						action: 'List instances',
					},
					{
						name: 'Add Instance',
						value: 'addInstance',
						description: 'Add a new qBittorrent instance',
						action: 'Add instance',
					},
					{
						name: 'Reorder Instances',
						value: 'reorderInstances',
						description: 'Update the display order for all configured instances. The list must include every instance ID exactly once.',
						action: 'Reorder instances',
					},
					{
						name: 'Delete Instance',
						value: 'deleteInstance',
						description: 'Remove a qBittorrent instance',
						action: 'Delete instance',
					},
					{
						name: 'Update Instance',
						value: 'updateInstance',
						description: 'Update instance configuration',
						action: 'Update instance',
					},
					{
						name: 'Get Alternative Speed Limits Status',
						value: 'getAlternativeSpeedLimitsStatus',
						description: 'Get current status of alternative speed limits (turtle mode)',
						action: 'Get alternative speed limits status',
					},
					{
						name: 'Toggle Alternative Speed Limits',
						value: 'toggleAlternativeSpeedLimits',
						description: 'Toggle alternative speed limits (turtle mode) on/off',
						action: 'Toggle alternative speed limits',
					},
					{
						name: 'Get qBittorrent Application Info',
						value: 'getQbittorrentApplicationInfo',
						description: 'Get qBittorrent version and build information for an instance',
						action: 'Get qbittorrent application info',
					},
					{
						name: 'Get Instance Capabilities',
						value: 'getInstanceCapabilities',
						description: 'Retrieve lightweight capability metadata for a qBittorrent instance',
						action: 'Get instance capabilities',
					},
					{
						name: 'Get Directory Contents',
						value: 'getDirectoryContents',
						description: 'Retrieve directory contents from the qBittorrent host filesystem for path autocomplete',
						action: 'Get directory contents',
					},
					{
						name: 'Get Instance Preferences',
						value: 'getInstancePreferences',
						description: 'Get qBittorrent instance preferences/settings',
						action: 'Get instance preferences',
					},
					{
						name: 'Update Instance Preferences',
						value: 'updateInstancePreferences',
						description: 'Update qBittorrent instance preferences/settings',
						action: 'Update instance preferences',
					},
					{
						name: 'Get Recent Tracker Reannounce Activity',
						value: 'getRecentTrackerReannounceActivity',
						description: 'Return the most recent tracker reannounce events for an instance',
						action: 'Get recent tracker reannounce activity',
					},
					{
						name: 'Get Current Tracker Reannounce Candidates',
						value: 'getCurrentTrackerReannounceCandidates',
						description: 'Return torrents that currently fall within the reannounce monitoring scope and have problematic or pending trackers',
						action: 'Get current tracker reannounce candidates',
					},
					{
						name: 'Update Instance Status',
						value: 'updateInstanceStatus',
						description: 'Enable or disable automatic polling for the specified instance',
						action: 'Update instance status',
					},
					{
						name: 'Test Connection',
						value: 'testConnection',
						description: 'Test connection to a qBittorrent instance',
						action: 'Test connection',
					},
				],
				default: 'listInstances',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['licenses'],
					},
				},
				options: [
					{
						name: 'Activate License',
						value: 'activateLicense',
						description: 'Activate a license key and store it for the current user',
						action: 'Activate license',
					},
					{
						name: 'Check Premium Access',
						value: 'checkPremiumAccess',
						description: 'Check if any active licenses grant premium access',
						action: 'Check premium access',
					},
					{
						name: 'List Licenses',
						value: 'listLicenses',
						description: 'List all stored licenses',
						action: 'List licenses',
					},
					{
						name: 'Refresh Licenses',
						value: 'refreshLicenses',
						description: 'Refresh all stored licenses from the licensing service',
						action: 'Refresh licenses',
					},
					{
						name: 'Validate License',
						value: 'validateLicense',
						description: 'Validate a license key and ensure it remains active',
						action: 'Validate license',
					},
					{
						name: 'Delete License',
						value: 'deleteLicense',
						description: 'Remove a stored license',
						action: 'Delete license',
					},
				],
				default: 'activateLicense',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
					},
				},
				options: [
					{
						name: 'List Orphan Scan Runs',
						value: 'listOrphanScanRuns',
						description: 'Get recent orphan scan runs for an instance. Requires local filesystem access.',
						action: 'List orphan scan runs',
					},
					{
						name: 'Cancel Orphan Scan Run',
						value: 'cancelOrphanScanRun',
						description: 'Cancel a pending, scanning, or preview_ready run. Cannot cancel runs that are actively deleting. Requires local filesystem access.',
						action: 'Cancel orphan scan run',
					},
					{
						name: 'Get Orphan Scan Run',
						value: 'getOrphanScanRun',
						description: 'Get details of a specific scan run including the list of orphan files found. Requires local filesystem access.',
						action: 'Get orphan scan run',
					},
					{
						name: 'Confirm Orphan File Deletion',
						value: 'confirmOrphanFileDeletion',
						description: 'Confirm deletion of orphan files from a preview_ready run. This initiates the actual file deletion. Requires local filesystem access.',
						action: 'Confirm orphan file deletion',
					},
					{
						name: 'Trigger Orphan Scan',
						value: 'triggerOrphanScan',
						description: 'Start a manual orphan file scan for an instance. Returns immediately with the run ID.',
						action: 'Trigger orphan scan',
					},
					{
						name: 'Get Orphan Scan Settings',
						value: 'getOrphanScanSettings',
						description: 'Get orphan file scanning settings for an instance. Requires local filesystem access.',
						action: 'Get orphan scan settings',
					},
					{
						name: 'Update Orphan Scan Settings',
						value: 'updateOrphanScanSettings',
						description: 'Update orphan file scanning settings for an instance. Requires local filesystem access.',
						action: 'Update orphan scan settings',
					},
				],
				default: 'listOrphanScanRuns',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['rss'],
					},
				},
				options: [
					{
						name: 'Mark Articles as Read',
						value: 'markArticlesAsRead',
						description: 'Mark RSS articles as read',
						action: 'Mark articles as read',
					},
					{
						name: 'Add RSS Feed',
						value: 'addRssFeed',
						description: 'Add a new RSS feed',
						action: 'Add rss feed',
					},
					{
						name: 'Set Feed URL',
						value: 'setFeedUrl',
						description: 'Change the URL of an existing RSS feed',
						action: 'Set feed url',
					},
					{
						name: 'Create RSS Folder',
						value: 'createRssFolder',
						description: 'Create a new RSS folder',
						action: 'Create rss folder',
					},
					{
						name: 'Remove RSS Item',
						value: 'removeRssItem',
						description: 'Remove an RSS feed or folder',
						action: 'Remove rss item',
					},
					{
						name: 'Get RSS Items',
						value: 'getRssItems',
						description: 'Retrieve all RSS feeds and folders for an instance',
						action: 'Get rss items',
					},
					{
						name: 'Move RSS Item',
						value: 'moveRssItem',
						description: 'Move an RSS feed or folder to a new location',
						action: 'Move rss item',
					},
					{
						name: 'Refresh RSS Item',
						value: 'refreshRssItem',
						description: 'Trigger a manual refresh of an RSS feed or folder',
						action: 'Refresh rss item',
					},
					{
						name: 'Get RSS Rules',
						value: 'getRssRules',
						description: 'Retrieve all RSS auto-download rules',
						action: 'Get rss rules',
					},
					{
						name: 'Create or Update RSS Rule',
						value: 'createOrUpdateRssRule',
						description: 'Create a new rule or update an existing one',
						action: 'Create or update rss rule',
					},
					{
						name: 'Reprocess RSS Rules',
						value: 'reprocessRssRules',
						description: 'Trigger qBittorrent to reprocess all unread articles against rules',
						action: 'Reprocess rss rules',
					},
					{
						name: 'Delete RSS Rule',
						value: 'deleteRssRule',
						description: 'Delete an RSS auto-download rule',
						action: 'Delete rss rule',
					},
					{
						name: 'Preview RSS Rule Matches',
						value: 'previewRssRuleMatches',
						description: 'Get articles that would match an RSS rule',
						action: 'Preview rss rule matches',
					},
					{
						name: 'Rename RSS Rule',
						value: 'renameRssRule',
						description: 'Rename an existing RSS auto-download rule',
						action: 'Rename rss rule',
					},
				],
				default: 'markArticlesAsRead',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['system'],
					},
				},
				options: [
					{
						name: 'Get Log Exclusions',
						value: 'getLogExclusions',
						description: 'Get the list of muted log message patterns',
						action: 'Get log exclusions',
					},
					{
						name: 'Update Log Exclusions',
						value: 'updateLogExclusions',
						description: 'Replace the list of muted log message patterns',
						action: 'Update log exclusions',
					},
					{
						name: 'Get Log Settings',
						value: 'getLogSettings',
						description: 'Get the current log configuration including level, file path, and rotation settings',
						action: 'Get log settings',
					},
					{
						name: 'Update Log Settings',
						value: 'updateLogSettings',
						description: 'Update log configuration. Changes are applied immediately.',
						action: 'Update log settings',
					},
					{
						name: 'Check for Latest Version',
						value: 'checkForLatestVersion',
						description: 'Check if a newer version of qui is available',
						action: 'Check for latest version',
					},
					{
						name: 'Health Check',
						value: 'healthCheck',
						description: 'Check if the API is healthy and responding',
						action: 'Health check',
					},
					{
						name: 'Liveness Probe',
						value: 'livenessProbe',
						description: 'Simple liveness check to confirm the service is running',
						action: 'Liveness probe',
					},
					{
						name: 'Readiness Probe',
						value: 'readinessProbe',
						description: 'Check if the service and its dependencies are ready to receive traffic',
						action: 'Readiness probe',
					},
				],
				default: 'getLogExclusions',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tags'],
					},
				},
				options: [
					{
						name: 'Delete Tags',
						value: 'deleteTags',
						description: 'Delete one or more tags',
						action: 'Delete tags',
					},
					{
						name: 'List Tags',
						value: 'listTags',
						description: 'Get all tags',
						action: 'List tags',
					},
					{
						name: 'Create Tags',
						value: 'createTags',
						description: 'Create new tags',
						action: 'Create tags',
					},
				],
				default: 'deleteTags',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
					},
				},
				options: [
					{
						name: 'Export Torrent File',
						value: 'exportTorrentFile',
						description: 'Download the .torrent file for a specific torrent',
						action: 'Export torrent file',
					},
					{
						name: 'Get Torrent Files',
						value: 'getTorrentFiles',
						description: 'Get list of files in a torrent',
						action: 'Get torrent files',
					},
					{
						name: 'Update Torrent File Priorities',
						value: 'updateTorrentFilePriorities',
						description: 'Adjust the download priority (including do-not-download) for one or more files in a torrent',
						action: 'Update torrent file priorities',
					},
					{
						name: 'Get Torrent Peers',
						value: 'getTorrentPeers',
						description: 'Get list of peers for a torrent',
						action: 'Get torrent peers',
					},
					{
						name: 'Get Torrent Piece States',
						value: 'getTorrentPieceStates',
						description: 'Get download state of each piece for a torrent',
						action: 'Get torrent piece states',
					},
					{
						name: 'Get Torrent Properties',
						value: 'getTorrentProperties',
						description: 'Get detailed properties of a torrent',
						action: 'Get torrent properties',
					},
					{
						name: 'Rename Torrent',
						value: 'renameTorrent',
						description: 'Update the display name for a torrent',
						action: 'Rename torrent',
					},
					{
						name: 'Rename Torrent File',
						value: 'renameTorrentFile',
						description: 'Rename a specific file within a torrent',
						action: 'Rename torrent file',
					},
					{
						name: 'Rename Torrent Folder',
						value: 'renameTorrentFolder',
						description: 'Rename a folder within a torrent',
						action: 'Rename torrent folder',
					},
					{
						name: 'Remove Torrent Trackers',
						value: 'removeTorrentTrackers',
						description: 'Remove trackers from a torrent',
						action: 'Remove torrent trackers',
					},
					{
						name: 'Get Torrent Trackers',
						value: 'getTorrentTrackers',
						description: 'Get list of trackers for a torrent',
						action: 'Get torrent trackers',
					},
					{
						name: 'Add Torrent Trackers',
						value: 'addTorrentTrackers',
						description: 'Add new trackers to a torrent',
						action: 'Add torrent trackers',
					},
					{
						name: 'Edit Torrent Tracker',
						value: 'editTorrentTracker',
						description: 'Edit a tracker URL for a torrent',
						action: 'Edit torrent tracker',
					},
					{
						name: 'Get Torrent Web Seeds',
						value: 'getTorrentWebSeeds',
						description: 'Get list of web seeds (HTTP sources) for a torrent',
						action: 'Get torrent web seeds',
					},
				],
				default: 'exportTorrentFile',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['torrents'],
					},
				},
				options: [
					{
						name: 'Create Torrent',
						value: 'createTorrent',
						description: 'Create a new torrent file from a source path. Requires qBittorrent v5.0.0 or later.',
						action: 'Create torrent',
					},
					{
						name: 'Get Active Torrent Creation Task Count',
						value: 'getActiveTorrentCreationTaskCount',
						description: 'Get the number of active (running or queued) torrent creation tasks',
						action: 'Get active torrent creation task count',
					},
					{
						name: 'Get Torrent Creation Status',
						value: 'getTorrentCreationStatus',
						description: 'Get status of torrent creation tasks. Query parameter taskID can be used to filter by specific task.',
						action: 'Get torrent creation status',
					},
					{
						name: 'Delete Torrent Creation Task',
						value: 'deleteTorrentCreationTask',
						description: 'Delete a torrent creation task',
						action: 'Delete torrent creation task',
					},
					{
						name: 'Download Created Torrent File',
						value: 'downloadCreatedTorrentFile',
						description: 'Download the torrent file for a completed torrent creation task',
						action: 'Download created torrent file',
					},
					{
						name: 'List Torrents',
						value: 'listTorrents',
						description: 'Get paginated list of torrents',
						action: 'List torrents',
					},
					{
						name: 'Add Torrent',
						value: 'addTorrent',
						description: 'Add a new torrent via file upload or magnet link',
						action: 'Add torrent',
					},
					{
						name: 'Add Peers to Torrents',
						value: 'addPeersToTorrents',
						description: 'Add peers to one or more torrents',
						action: 'Add peers to torrents',
					},
					{
						name: 'Ban Peers Permanently',
						value: 'banPeersPermanently',
						description: 'Ban peers from connecting to the client',
						action: 'Ban peers permanently',
					},
					{
						name: 'Bulk Torrent Action',
						value: 'bulkTorrentAction',
						description: 'Perform bulk actions on multiple torrents',
						action: 'Bulk torrent action',
					},
					{
						name: 'Check for Duplicate Torrents',
						value: 'checkForDuplicateTorrents',
						description: 'Determine whether any of the provided hashes already exist on the qBittorrent instance. Supports infohash v1 or v2 values.',
						action: 'Check for duplicate torrents',
					},
					{
						name: 'List Torrents Across All Instances',
						value: 'listTorrentsAcrossAllInstances',
						description: 'Get paginated list of torrents from all instances (primarily used for cross-seed filtering)',
						action: 'List torrents across all instances',
					},
				],
				default: 'createTorrent',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['trackerIcons'],
					},
				},
				options: [
					{
						name: 'List Tracker Icons',
						value: 'listTrackerIcons',
						description: 'Retrieve cached tracker favicons as data URLs keyed by tracker hostname',
						action: 'List tracker icons',
					},
				],
				default: 'listTrackerIcons',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['trackers'],
					},
				},
				options: [
					{
						name: 'List Active Trackers',
						value: 'listActiveTrackers',
						description: 'Get active tracker domains and representative tracker URLs for an instance',
						action: 'List active trackers',
					},
				],
				default: 'listActiveTrackers',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['apiKeys'],
						operation: ['createApiKey'],
					},
				},
				description: 'Descriptive name for the API key',
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['apiKeys'],
						operation: ['deleteApiKey'],
					},
				},
			},
			{
				displayName: 'Api_key',
				name: 'api_key',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['createArrInstance'],
					},
				},
			},
			{
				displayName: 'Base_url',
				name: 'base_url',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['createArrInstance'],
					},
				},
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['createArrInstance'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['createArrInstance'],
					},
				},
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['createArrInstance'],
					},
				},
			},
			{
				displayName: 'Timeout_seconds',
				name: 'timeout_seconds',
				type: 'number',
				default: 15,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['createArrInstance'],
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['createArrInstance'],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['deleteArrInstance'],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['getArrInstance'],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['updateArrInstance'],
					},
				},
			},
			{
				displayName: 'Api_key',
				name: 'api_key',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['updateArrInstance'],
					},
				},
				description: 'Only update if provided',
			},
			{
				displayName: 'Base_url',
				name: 'base_url',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['updateArrInstance'],
					},
				},
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['updateArrInstance'],
					},
				},
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['updateArrInstance'],
					},
				},
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['updateArrInstance'],
					},
				},
			},
			{
				displayName: 'Timeout_seconds',
				name: 'timeout_seconds',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['updateArrInstance'],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['testArrInstance'],
					},
				},
			},
			{
				displayName: 'Content_type',
				name: 'content_type',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['resolveTitleToExternalIds'],
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['resolveTitleToExternalIds'],
					},
				},
			},
			{
				displayName: 'Api_key',
				name: 'api_key',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['testArrConnection'],
					},
				},
			},
			{
				displayName: 'Base_url',
				name: 'base_url',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['testArrConnection'],
					},
				},
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['arrIntegrations'],
						operation: ['testArrConnection'],
					},
				},
			},
			{
				displayName: 'Current Password',
				name: 'currentPassword',
				type: 'string',
				typeOptions: { password: true },
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['authentication'],
						operation: ['changePassword'],
					},
				},
				description: 'Current password for verification',
			},
			{
				displayName: 'New Password',
				name: 'newPassword',
				type: 'string',
				typeOptions: { password: true },
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['authentication'],
						operation: ['changePassword'],
					},
				},
				description: 'New password will be hashed and never returned in responses',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['authentication'],
						operation: ['login'],
					},
				},
				description: 'Password will be hashed and never returned in responses',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['authentication'],
						operation: ['login'],
					},
				},
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['authentication'],
						operation: ['initialSetup'],
					},
				},
				description: 'Password will be hashed and never returned in responses',
			},
			{
				displayName: 'Username',
				name: 'username',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['authentication'],
						operation: ['initialSetup'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['importBackupManifest'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['importBackupManifest'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['downloadBackupArchive'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Backup Run ID',
				name: 'runId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['downloadBackupArchive'],
					},
				},
				description: 'Backup run ID',
			},
			{
				displayName: 'Archive Format to Download. Defaults to Zip.',
				name: 'format',
				type: 'string',
				default: "zip",
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['downloadBackupArchive'],
					},
				},
				description: 'Archive format to download. Defaults to zip.',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['downloadTorrentFileFromBackup'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Backup Run ID',
				name: 'runId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['downloadTorrentFileFromBackup'],
					},
				},
				description: 'Backup run ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'torrentHash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['downloadTorrentFileFromBackup'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['executeRestore'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Backup Run ID',
				name: 'runId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['executeRestore'],
					},
				},
				description: 'Backup run ID',
			},
			{
				displayName: 'Auto Resume Verified',
				name: 'autoResumeVerified',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['executeRestore'],
					},
				},
				description: 'Whether to automatically resume torrents once qBittorrent reports them as fully verified. Defaults to true when skip recheck is enabled.',
			},
			{
				displayName: 'Dry Run',
				name: 'dryRun',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['executeRestore'],
					},
				},
				description: 'When true, no changes are applied and the plan is returned',
			},
			{
				displayName: 'Exclude Hashes',
				name: 'excludeHashes',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['executeRestore'],
					},
				},
				description: 'Torrent hashes to exclude from the restore plan and execution',
			},
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['executeRestore'],
					},
				},
				description: 'Restore mode',
			},
			{
				displayName: 'Skip Hash Check',
				name: 'skipHashCheck',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['executeRestore'],
					},
				},
				description: 'Skip re-checking the restored torrent data. Defaults to false.',
			},
			{
				displayName: 'Start Paused',
				name: 'startPaused',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['executeRestore'],
					},
				},
				description: 'Start restored torrents paused. Defaults to true.',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['previewRestorePlan'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Backup Run ID',
				name: 'runId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['previewRestorePlan'],
					},
				},
				description: 'Backup run ID',
			},
			{
				displayName: 'Auto Resume Verified',
				name: 'autoResumeVerified',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['previewRestorePlan'],
					},
				},
				description: 'Automatically resume torrents once qBittorrent reports them as fully verified. Defaults to true when skip recheck is enabled.',
			},
			{
				displayName: 'Exclude Hashes',
				name: 'excludeHashes',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['previewRestorePlan'],
					},
				},
				description: 'Torrent hashes to exclude from the generated plan',
			},
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['previewRestorePlan'],
					},
				},
				description: 'Restore mode',
			},
			{
				displayName: 'Skip Hash Check',
				name: 'skipHashCheck',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['previewRestorePlan'],
					},
				},
				description: 'Skip re-checking the restored torrent data. Defaults to false.',
			},
			{
				displayName: 'Start Paused',
				name: 'startPaused',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['previewRestorePlan'],
					},
				},
				description: 'Start restored torrents paused. Defaults to true.',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['deleteCategories'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Categories',
				name: 'categories',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['deleteCategories'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['listCategories'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['createCategory'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['createCategory'],
					},
				},
			},
			{
				displayName: 'Save Path',
				name: 'savePath',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['createCategory'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['editCategory'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['editCategory'],
					},
				},
			},
			{
				displayName: 'Save Path',
				name: 'savePath',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['editCategory'],
					},
				},
			},
			{
				displayName: 'Client Name',
				name: 'clientName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['clientApiKeys'],
						operation: ['createClientApiKey'],
					},
				},
				description: 'Name of the client application (e.g., "Sonarr")',
			},
			{
				displayName: 'Instance ID',
				name: 'instanceId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['clientApiKeys'],
						operation: ['createClientApiKey'],
					},
				},
				description: 'ID of the qBittorrent instance to proxy to',
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['clientApiKeys'],
						operation: ['deleteClientApiKey'],
					},
				},
			},
			{
				displayName: 'API Key (Prefer X-API-Key Header; Query Supported for Autobrr).',
				name: 'apikey',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
				description: 'API key (prefer X-API-Key header; query supported for autobrr)',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
				description: 'Category to apply when adding the torrent',
			},
			{
				displayName: 'Find Individual Episodes',
				name: 'findIndividualEpisodes',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
			},
			{
				displayName: 'Indexer Name',
				name: 'indexerName',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
				description: 'Indexer display name (e.g., "TorrentDB"). Only used when "Use indexer name as category" mode is enabled; ignored otherwise. Webhook applies cannot derive the indexer from the torrent file, so this ...',
			},
			{
				displayName: 'Instance IDs',
				name: 'instanceIds',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
				description: 'Optional list of target instance IDs. When omitted or empty, qui attempts to cross-seed into any instance that has a complete match.',
			},
			{
				displayName: 'Skip If Exists',
				name: 'skipIfExists',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
			},
			{
				displayName: 'Start Paused',
				name: 'startPaused',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
			},
			{
				displayName: 'Torrent Data',
				name: 'torrentData',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
				description: 'Base64-encoded torrent file provided by autobrr (for example, using the TorrentDataRawBytes macro piped through toString|b64enc or toJson)',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['getPerInstanceCompletionSettings'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updatePerInstanceCompletionSettings'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Categories',
				name: 'categories',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updatePerInstanceCompletionSettings'],
					},
				},
				description: 'Only trigger for torrents in these categories (empty means all)',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updatePerInstanceCompletionSettings'],
					},
				},
				description: 'Whether automatic cross-seed search is enabled for this instance',
			},
			{
				displayName: 'Exclude Categories',
				name: 'excludeCategories',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updatePerInstanceCompletionSettings'],
					},
				},
				description: 'Skip torrents in these categories',
			},
			{
				displayName: 'Exclude Tags',
				name: 'excludeTags',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updatePerInstanceCompletionSettings'],
					},
				},
				description: 'Skip torrents with any of these tags',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updatePerInstanceCompletionSettings'],
					},
				},
				description: 'Require at least one matching tag (empty means all)',
			},
			{
				displayName: 'Dry Run',
				name: 'dryRun',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['triggerCrossseedAutomationRun'],
					},
				},
			},
			{
				displayName: 'Maximum Number of Runs to Return',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['listCrossseedAutomationRuns'],
					},
				},
				description: 'Maximum number of runs to return',
			},
			{
				displayName: 'Offset for Pagination',
				name: 'offset',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['listCrossseedAutomationRuns'],
					},
				},
				description: 'Offset for pagination',
			},
			{
				displayName: 'Categories',
				name: 'categories',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['startACrossseedSearchRun'],
					},
				},
				description: 'Filter torrents by categories',
			},
			{
				displayName: 'Cooldown Minutes',
				name: 'cooldownMinutes',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['startACrossseedSearchRun'],
					},
				},
				description: 'Cooldown period between searches for the same torrent',
			},
			{
				displayName: 'Indexer IDs',
				name: 'indexerIds',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['startACrossseedSearchRun'],
					},
				},
				description: 'Specific indexers to search',
			},
			{
				displayName: 'Instance ID',
				name: 'instanceId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['startACrossseedSearchRun'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Interval Seconds',
				name: 'intervalSeconds',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['startACrossseedSearchRun'],
					},
				},
				description: 'Interval between processing torrents in seconds',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['startACrossseedSearchRun'],
					},
				},
				description: 'Filter torrents by tags',
			},
			{
				displayName: 'Instance ID to get runs for',
				name: 'instanceId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['listSearchRunHistory'],
					},
				},
				description: 'Instance ID to get runs for',
			},
			{
				displayName: 'Maximum Number of Runs to Return',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['listSearchRunHistory'],
					},
				},
				description: 'Maximum number of runs to return',
			},
			{
				displayName: 'Number of Runs to Skip',
				name: 'offset',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['listSearchRunHistory'],
					},
				},
				description: 'Number of runs to skip',
			},
			{
				displayName: 'Categories',
				name: 'categories',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updateSeededTorrentSearchSettings'],
					},
				},
			},
			{
				displayName: 'Cooldown Minutes',
				name: 'cooldownMinutes',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updateSeededTorrentSearchSettings'],
					},
				},
			},
			{
				displayName: 'Indexer IDs',
				name: 'indexerIds',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updateSeededTorrentSearchSettings'],
					},
				},
			},
			{
				displayName: 'Instance ID',
				name: 'instanceId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updateSeededTorrentSearchSettings'],
					},
				},
			},
			{
				displayName: 'Interval Seconds',
				name: 'intervalSeconds',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updateSeededTorrentSearchSettings'],
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updateSeededTorrentSearchSettings'],
					},
				},
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['patchCrossseedAutomationSettings'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updateCrossseedAutomationSettings'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['analyzeTorrentForCrossseedSearch'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['analyzeTorrentForCrossseedSearch'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addTorrentsFoundViaCrossseedSearch'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addTorrentsFoundViaCrossseedSearch'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'Selections',
				name: 'selections',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addTorrentsFoundViaCrossseedSearch'],
					},
				},
			},
			{
				displayName: 'Start_paused',
				name: 'start_paused',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addTorrentsFoundViaCrossseedSearch'],
					},
				},
			},
			{
				displayName: 'Tag_name',
				name: 'tag_name',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addTorrentsFoundViaCrossseedSearch'],
					},
				},
			},
			{
				displayName: 'Use_tag',
				name: 'use_tag',
				type: 'boolean',
				required: true,
				default: false,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addTorrentsFoundViaCrossseedSearch'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['getAsyncFilteringStatus'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['getAsyncFilteringStatus'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['findLocalCrossseedMatches'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['findLocalCrossseedMatches'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'When True, Fail if File Overlap Checks Cannot Complete (Use for Delete Dialogs to Avoid False Negatives)',
				name: 'strict',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['findLocalCrossseedMatches'],
					},
				},
				description: 'When true, fail if file overlap checks cannot complete (use for delete dialogs to avoid false negatives)',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['searchCrossseedCandidatesForATorrent'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['searchCrossseedCandidatesForATorrent'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'Indexer_ids',
				name: 'indexer_ids',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['searchCrossseedCandidatesForATorrent'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				description: 'Max number of results to return',
				default: 50,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['searchCrossseedCandidatesForATorrent'],
					},
				},
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['searchCrossseedCandidatesForATorrent'],
					},
				},
			},
			{
				displayName: 'API Key (Prefer X-API-Key Header; Query Supported for Autobrr Webhook).',
				name: 'apikey',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['checkIfAReleaseCanBeCrossseededAutobrrWebhook'],
					},
				},
				description: 'API key (prefer X-API-Key header; query supported for autobrr webhook)',
			},
			{
				displayName: 'Find Individual Episodes',
				name: 'findIndividualEpisodes',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['checkIfAReleaseCanBeCrossseededAutobrrWebhook'],
					},
				},
				description: 'Optional override for matching season packs vs episodes. Defaults to the Cross-Seed automation setting when omitted.',
			},
			{
				displayName: 'Instance IDs',
				name: 'instanceIds',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['checkIfAReleaseCanBeCrossseededAutobrrWebhook'],
					},
				},
				description: 'Optional list of qBittorrent instance IDs to consider. When omitted or empty, qui searches all configured instances.',
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['checkIfAReleaseCanBeCrossseededAutobrrWebhook'],
					},
				},
				description: 'Total torrent size in bytes (optional - enables size validation when provided)',
			},
			{
				displayName: 'Torrent Name',
				name: 'torrentName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['checkIfAReleaseCanBeCrossseededAutobrrWebhook'],
					},
				},
				description: 'Release name as announced (parsed using rls library to extract metadata)',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['getCrossseedStatusForInstance'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Arr Instance ID',
				name: 'arrInstanceId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['createScanDirectory'],
					},
				},
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['createScanDirectory'],
					},
				},
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['createScanDirectory'],
					},
				},
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['createScanDirectory'],
					},
				},
			},
			{
				displayName: 'Qbit Path Prefix',
				name: 'qbitPathPrefix',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['createScanDirectory'],
					},
				},
			},
			{
				displayName: 'Scan Interval Minutes',
				name: 'scanIntervalMinutes',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['createScanDirectory'],
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['createScanDirectory'],
					},
				},
			},
			{
				displayName: 'Target Instance ID',
				name: 'targetInstanceId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['createScanDirectory'],
					},
				},
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['deleteScanDirectory'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['getScanDirectory'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateScanDirectory'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Arr Instance ID',
				name: 'arrInstanceId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateScanDirectory'],
					},
				},
				description: 'Set to -1 to clear',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateScanDirectory'],
					},
				},
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateScanDirectory'],
					},
				},
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateScanDirectory'],
					},
				},
			},
			{
				displayName: 'Qbit Path Prefix',
				name: 'qbitPathPrefix',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateScanDirectory'],
					},
				},
			},
			{
				displayName: 'Scan Interval Minutes',
				name: 'scanIntervalMinutes',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateScanDirectory'],
					},
				},
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateScanDirectory'],
					},
				},
			},
			{
				displayName: 'Target Instance ID',
				name: 'targetInstanceId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateScanDirectory'],
					},
				},
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanFiles'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Filter Files by Status',
				name: 'status',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanFiles'],
					},
				},
				description: 'Filter files by status',
			},
			{
				displayName: 'Maximum Number of Items to Return',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanFiles'],
					},
				},
				description: 'Maximum number of items to return',
			},
			{
				displayName: 'Offset for Pagination',
				name: 'offset',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanFiles'],
					},
				},
				description: 'Offset for pagination',
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['resetDirectoryScanProgress'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanRuns'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Maximum Number of Runs to Return',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanRuns'],
					},
				},
				description: 'Maximum number of runs to return',
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanRunInjections'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Directory Scan Run ID',
				name: 'runID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanRunInjections'],
					},
				},
				description: 'Directory scan run ID',
			},
			{
				displayName: 'Maximum Number of Items to Return',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanRunInjections'],
					},
				},
				description: 'Maximum number of items to return',
			},
			{
				displayName: 'Offset for Pagination',
				name: 'offset',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanRunInjections'],
					},
				},
				description: 'Offset for pagination',
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['cancelADirectoryScan'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['triggerADirectoryScan'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Directory Scan Directory ID',
				name: 'directoryID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['getDirectoryScanStatus'],
					},
				},
				description: 'Directory scan directory ID',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['updateDirScanSettings'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'Args_template',
				name: 'args_template',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['createExternalProgram'],
					},
				},
				description: 'Arguments template with variable substitution ({hash}, {name}, {save_path}, {content_path}, {category}, {tags}, {state}, {size}, {progress})',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['createExternalProgram'],
					},
				},
				description: 'Whether this program is enabled',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['createExternalProgram'],
					},
				},
				description: 'Display name for the external program',
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['createExternalProgram'],
					},
				},
				description: 'Path to the executable',
			},
			{
				displayName: 'Path_mappings',
				name: 'path_mappings',
				type: 'json',
				default: [],
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['createExternalProgram'],
					},
				},
				description: 'Path mappings to convert remote paths to local paths (useful for remote instances)',
			},
			{
				displayName: 'Use_terminal',
				name: 'use_terminal',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['createExternalProgram'],
					},
				},
				description: 'Whether to launch in a terminal window',
			},
			{
				displayName: 'Hashes',
				name: 'hashes',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['executeExternalProgram'],
					},
				},
				description: 'Array of torrent hashes to execute the program for',
			},
			{
				displayName: 'Instance_id',
				name: 'instance_id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['executeExternalProgram'],
					},
				},
				description: 'ID of the qBittorrent instance where the torrents are located',
			},
			{
				displayName: 'Program_id',
				name: 'program_id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['executeExternalProgram'],
					},
				},
				description: 'ID of the external program to execute',
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['deleteExternalProgram'],
					},
				},
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['updateExternalProgram'],
					},
				},
			},
			{
				displayName: 'Args_template',
				name: 'args_template',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['updateExternalProgram'],
					},
				},
				description: 'Arguments template with variable substitution',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['updateExternalProgram'],
					},
				},
				description: 'Whether this program is enabled',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['updateExternalProgram'],
					},
				},
				description: 'Display name for the external program',
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['updateExternalProgram'],
					},
				},
				description: 'Path to the executable',
			},
			{
				displayName: 'Path_mappings',
				name: 'path_mappings',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['updateExternalProgram'],
					},
				},
				description: 'Path mappings to convert remote paths to local paths',
			},
			{
				displayName: 'Use_terminal',
				name: 'use_terminal',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['externalPrograms'],
						operation: ['updateExternalProgram'],
					},
				},
				description: 'Whether to launch in a terminal window',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['addInstance'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'Instance IDs',
				name: 'instanceIds',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['reorderInstances'],
					},
				},
				description: 'Instance IDs in the desired display order',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['deleteInstance'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['updateInstance'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['updateInstance'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getAlternativeSpeedLimitsStatus'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['toggleAlternativeSpeedLimits'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getQbittorrentApplicationInfo'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getInstanceCapabilities'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getDirectoryContents'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'The Directory Path to List Contents From',
				name: 'dirPath',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getDirectoryContents'],
					},
				},
				description: 'The directory path to list contents from',
			},
			{
				displayName: 'Include File/folder Metadata in Response',
				name: 'withMetadata',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getDirectoryContents'],
					},
				},
				description: 'Include file/folder metadata in response',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getInstancePreferences'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['updateInstancePreferences'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['updateInstancePreferences'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getRecentTrackerReannounceActivity'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Optional Maximum Number of Events to Return.',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getRecentTrackerReannounceActivity'],
					},
				},
				description: 'Optional maximum number of events to return',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getCurrentTrackerReannounceCandidates'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['updateInstanceStatus'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				required: true,
				default: false,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['updateInstanceStatus'],
					},
				},
				description: 'Set to false to pause all automatic connections to the upstream qBittorrent instance',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['testConnection'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'License Key',
				name: 'licenseKey',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['licenses'],
						operation: ['activateLicense'],
					},
				},
			},
			{
				displayName: 'License Key',
				name: 'licenseKey',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['licenses'],
						operation: ['validateLicense'],
					},
				},
			},
			{
				displayName: 'licenseKey',
				name: 'licenseKey',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['licenses'],
						operation: ['deleteLicense'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['listOrphanScanRuns'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Maximum Number of Runs to Return',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['listOrphanScanRuns'],
					},
				},
				description: 'Maximum number of runs to return',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['cancelOrphanScanRun'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Scan Run ID',
				name: 'runID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['cancelOrphanScanRun'],
					},
				},
				description: 'Scan run ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['getOrphanScanRun'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Scan Run ID',
				name: 'runID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['getOrphanScanRun'],
					},
				},
				description: 'Scan run ID',
			},
			{
				displayName: 'Maximum Number of Files to Return',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['getOrphanScanRun'],
					},
				},
				description: 'Maximum number of files to return',
			},
			{
				displayName: 'Offset for Pagination',
				name: 'offset',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['getOrphanScanRun'],
					},
				},
				description: 'Offset for pagination',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['confirmOrphanFileDeletion'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Scan Run ID',
				name: 'runID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['confirmOrphanFileDeletion'],
					},
				},
				description: 'Scan run ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['triggerOrphanScan'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['getOrphanScanSettings'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['updateOrphanScanSettings'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['updateOrphanScanSettings'],
					},
				},
			},
			{
				displayName: 'Grace Period Minutes',
				name: 'gracePeriodMinutes',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['updateOrphanScanSettings'],
					},
				},
			},
			{
				displayName: 'Ignore Paths',
				name: 'ignorePaths',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['updateOrphanScanSettings'],
					},
				},
			},
			{
				displayName: 'Max Files Per Run',
				name: 'maxFilesPerRun',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['updateOrphanScanSettings'],
					},
				},
			},
			{
				displayName: 'Preview Sort',
				name: 'previewSort',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['updateOrphanScanSettings'],
					},
				},
			},
			{
				displayName: 'Scan Interval Hours',
				name: 'scanIntervalHours',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['updateOrphanScanSettings'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['markArticlesAsRead'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Article ID',
				name: 'articleId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['markArticlesAsRead'],
					},
				},
				description: 'Optional specific article ID (omit to mark all as read)',
			},
			{
				displayName: 'Item Path',
				name: 'itemPath',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['markArticlesAsRead'],
					},
				},
				description: 'Path of the feed',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['addRssFeed'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['addRssFeed'],
					},
				},
				description: 'Optional folder path to add the feed to',
			},
			{
				displayName: 'Url',
				name: 'url',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['addRssFeed'],
					},
				},
				description: 'URL of the RSS feed',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['setFeedUrl'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['setFeedUrl'],
					},
				},
				description: 'Path of the feed',
			},
			{
				displayName: 'Url',
				name: 'url',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['setFeedUrl'],
					},
				},
				description: 'New URL for the feed',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['createRssFolder'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['createRssFolder'],
					},
				},
				description: 'Path for the new folder',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['removeRssItem'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['removeRssItem'],
					},
				},
				description: 'Path of the item to remove',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['getRssItems'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Include Article Data with Feeds',
				name: 'withData',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['getRssItems'],
					},
				},
				description: 'Include article data with feeds',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['moveRssItem'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Dest Path',
				name: 'destPath',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['moveRssItem'],
					},
				},
				description: 'Destination path (empty for root)',
			},
			{
				displayName: 'Item Path',
				name: 'itemPath',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['moveRssItem'],
					},
				},
				description: 'Current path of the item',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['refreshRssItem'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Item Path',
				name: 'itemPath',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['refreshRssItem'],
					},
				},
				description: 'Path of the item to refresh',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['getRssRules'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['createOrUpdateRssRule'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['createOrUpdateRssRule'],
					},
				},
				description: 'Name of the rule',
			},
			{
				displayName: 'Rule',
				name: 'rule',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['createOrUpdateRssRule'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['reprocessRssRules'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['deleteRssRule'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Name of the Rule to Delete',
				name: 'ruleName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['deleteRssRule'],
					},
				},
				description: 'Name of the rule to delete',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['previewRssRuleMatches'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Name of the Rule to Preview',
				name: 'ruleName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['previewRssRuleMatches'],
					},
				},
				description: 'Name of the rule to preview',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['renameRssRule'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Current Name of the Rule',
				name: 'ruleName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['renameRssRule'],
					},
				},
				description: 'Current name of the rule',
			},
			{
				displayName: 'New Name',
				name: 'newName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['renameRssRule'],
					},
				},
				description: 'New name for the rule',
			},
			{
				displayName: 'Patterns',
				name: 'patterns',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['updateLogExclusions'],
					},
				},
				description: 'List of log message patterns to hide',
			},
			{
				displayName: 'Level',
				name: 'level',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['updateLogSettings'],
					},
				},
				description: 'Log level to set',
			},
			{
				displayName: 'Max Backups',
				name: 'maxBackups',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['updateLogSettings'],
					},
				},
				description: 'Number of backup files to keep',
			},
			{
				displayName: 'Max Size',
				name: 'maxSize',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['updateLogSettings'],
					},
				},
				description: 'Maximum log file size in MB',
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['system'],
						operation: ['updateLogSettings'],
					},
				},
				description: 'Path to log file',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['deleteTags'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['deleteTags'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['listTags'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['createTags'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['createTags'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['exportTorrentFile'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['exportTorrentFile'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentFiles'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentFiles'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'Force Refresh From qBittorrent Instead of Serving Cached File Metadata.',
				name: 'refresh',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentFiles'],
					},
				},
				description: 'Force refresh from qBittorrent instead of serving cached file metadata',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['updateTorrentFilePriorities'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['updateTorrentFilePriorities'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'Indices',
				name: 'indices',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['updateTorrentFilePriorities'],
					},
				},
				description: 'File indices to update',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['updateTorrentFilePriorities'],
					},
				},
				description: 'Desired priority value (0-7, where 0 marks files as do-not-download)',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentPeers'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentPeers'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentPieceStates'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentPieceStates'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentProperties'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentProperties'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrent'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrent'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrent'],
					},
				},
				description: 'New name to assign to the torrent',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFile'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFile'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'New Path',
				name: 'newPath',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFile'],
					},
				},
				description: 'New relative path (including file name) to apply',
			},
			{
				displayName: 'Old Path',
				name: 'oldPath',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFile'],
					},
				},
				description: 'Existing relative path of the file inside the torrent',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFolder'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFolder'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'New Path',
				name: 'newPath',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFolder'],
					},
				},
				description: 'New folder path (relative) to apply',
			},
			{
				displayName: 'Old Path',
				name: 'oldPath',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFolder'],
					},
				},
				description: 'Existing folder path relative to the torrent root',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['removeTorrentTrackers'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['removeTorrentTrackers'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'Urls',
				name: 'urls',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['removeTorrentTrackers'],
					},
				},
				description: 'Newline-separated list of tracker URLs to remove',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentTrackers'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentTrackers'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['addTorrentTrackers'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['addTorrentTrackers'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'Urls',
				name: 'urls',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['addTorrentTrackers'],
					},
				},
				description: 'Newline-separated list of tracker URLs to add',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['editTorrentTracker'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['editTorrentTracker'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'New U R L',
				name: 'newURL',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['editTorrentTracker'],
					},
				},
				description: 'The new tracker URL',
			},
			{
				displayName: 'Old U R L',
				name: 'oldURL',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['editTorrentTracker'],
					},
				},
				description: 'The current tracker URL to replace',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentWebSeeds'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Torrent Hash',
				name: 'hash',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentWebSeeds'],
					},
				},
				description: 'Torrent hash',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['createTorrent'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['createTorrent'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['getActiveTorrentCreationTaskCount'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['getTorrentCreationStatus'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Optional Task ID to Filter By',
				name: 'taskID',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['getTorrentCreationStatus'],
					},
				},
				description: 'Optional task ID to filter by',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['deleteTorrentCreationTask'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Task ID to Delete',
				name: 'taskID',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['deleteTorrentCreationTask'],
					},
				},
				description: 'Task ID to delete',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['downloadCreatedTorrentFile'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Task ID of the Completed Torrent',
				name: 'taskID',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['downloadCreatedTorrentFile'],
					},
				},
				description: 'Task ID of the completed torrent',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrents'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrents'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrents'],
					},
				},
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrents'],
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'string',
				default: "desc",
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrents'],
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrents'],
					},
				},
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrents'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['addTorrent'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['addTorrent'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['addPeersToTorrents'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Hashes',
				name: 'hashes',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['addPeersToTorrents'],
					},
				},
				description: 'List of torrent hashes',
			},
			{
				displayName: 'Peers',
				name: 'peers',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['addPeersToTorrents'],
					},
				},
				description: 'List of peers in host:port format',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['banPeersPermanently'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Peers',
				name: 'peers',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['banPeersPermanently'],
					},
				},
				description: 'List of peer IPs to ban',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['bulkTorrentAction'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Body',
				name: 'body',
				type: 'json',
				default: '{}',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['bulkTorrentAction'],
					},
				},
				description: 'JSON request body',
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['checkForDuplicateTorrents'],
					},
				},
				description: 'QBittorrent instance ID',
			},
			{
				displayName: 'Hashes',
				name: 'hashes',
				type: 'json',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['checkForDuplicateTorrents'],
					},
				},
				description: 'List of torrent hashes to check. Maximum 512 entries per request.',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrentsAcrossAllInstances'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrentsAcrossAllInstances'],
					},
				},
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrentsAcrossAllInstances'],
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'string',
				default: "desc",
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrentsAcrossAllInstances'],
					},
				},
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrentsAcrossAllInstances'],
					},
				},
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrentsAcrossAllInstances'],
					},
				},
			},
			{
				displayName: 'qBittorrent Instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 1,
				displayOptions: {
					show: {
						resource: ['trackers'],
						operation: ['listActiveTrackers'],
					},
				},
				description: 'QBittorrent instance ID',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('quiApi');
		const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

		for (let i = 0; i < items.length; i++) {
			try {
				let endpoint = '';
				let method: IHttpRequestMethods = 'GET';
				let body: object | undefined;
				const qs: Record<string, string | number | boolean> = {};

				if (resource === 'apiKeys') {
					if (operation === 'listApiKeys') {
						endpoint = 'api-keys';
						method = 'GET';

					} else if (operation === 'createApiKey') {
						endpoint = 'api-keys';
						method = 'POST';
						body = {
							name: this.getNodeParameter('name', i, '') as string,
						};

					} else if (operation === 'deleteApiKey') {
						const id = this.getNodeParameter('id', i) as number;
						endpoint = 'api-keys/' + encodeURIComponent(id);
						method = 'DELETE';

					}
				} else if (resource === 'arrIntegrations') {
					if (operation === 'listArrInstances') {
						endpoint = 'arr/instances';
						method = 'GET';

					} else if (operation === 'createArrInstance') {
						endpoint = 'arr/instances';
						method = 'POST';
						body = {
							api_key: this.getNodeParameter('api_key', i, '') as string,
							base_url: this.getNodeParameter('base_url', i, '') as string,
							enabled: this.getNodeParameter('enabled', i, false) as boolean,
							name: this.getNodeParameter('name', i, '') as string,
							priority: this.getNodeParameter('priority', i, 0) as number,
							timeout_seconds: this.getNodeParameter('timeout_seconds', i, 0) as number,
							type: this.getNodeParameter('type', i, '') as string,
						};

					} else if (operation === 'deleteArrInstance') {
						const id = this.getNodeParameter('id', i) as number;
						endpoint = 'arr/instances/' + encodeURIComponent(id);
						method = 'DELETE';

					} else if (operation === 'getArrInstance') {
						const id = this.getNodeParameter('id', i) as number;
						endpoint = 'arr/instances/' + encodeURIComponent(id);
						method = 'GET';

					} else if (operation === 'updateArrInstance') {
						const id = this.getNodeParameter('id', i) as number;
						endpoint = 'arr/instances/' + encodeURIComponent(id);
						method = 'PUT';
						body = {
							api_key: this.getNodeParameter('api_key', i, '') as string,
							base_url: this.getNodeParameter('base_url', i, '') as string,
							enabled: this.getNodeParameter('enabled', i, false) as boolean,
							name: this.getNodeParameter('name', i, '') as string,
							priority: this.getNodeParameter('priority', i, 0) as number,
							timeout_seconds: this.getNodeParameter('timeout_seconds', i, 0) as number,
						};

					} else if (operation === 'testArrInstance') {
						const id = this.getNodeParameter('id', i) as number;
						endpoint = 'arr/instances/' + encodeURIComponent(id) + '/test';
						method = 'POST';

					} else if (operation === 'resolveTitleToExternalIds') {
						endpoint = 'arr/resolve';
						method = 'POST';
						body = {
							content_type: this.getNodeParameter('content_type', i, '') as string,
							title: this.getNodeParameter('title', i, '') as string,
						};

					} else if (operation === 'testArrConnection') {
						endpoint = 'arr/test';
						method = 'POST';
						body = {
							api_key: this.getNodeParameter('api_key', i, '') as string,
							base_url: this.getNodeParameter('base_url', i, '') as string,
							type: this.getNodeParameter('type', i, '') as string,
						};

					}
				} else if (resource === 'authentication') {
					if (operation === 'changePassword') {
						endpoint = 'auth/change-password';
						method = 'PUT';
						body = {
							currentPassword: this.getNodeParameter('currentPassword', i, '') as string,
							newPassword: this.getNodeParameter('newPassword', i, '') as string,
						};

					} else if (operation === 'checkSetupStatus') {
						endpoint = 'auth/check-setup';
						method = 'GET';

					} else if (operation === 'login') {
						endpoint = 'auth/login';
						method = 'POST';
						body = {
							password: this.getNodeParameter('password', i, '') as string,
							username: this.getNodeParameter('username', i, '') as string,
						};

					} else if (operation === 'logout') {
						endpoint = 'auth/logout';
						method = 'POST';

					} else if (operation === 'getCurrentUser') {
						endpoint = 'auth/me';
						method = 'GET';

					} else if (operation === 'initialSetup') {
						endpoint = 'auth/setup';
						method = 'POST';
						body = {
							password: this.getNodeParameter('password', i, '') as string,
							username: this.getNodeParameter('username', i, '') as string,
						};

					}
				} else if (resource === 'backups') {
					if (operation === 'importBackupManifest') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/backups/import';
						method = 'POST';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					} else if (operation === 'downloadBackupArchive') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const runId = this.getNodeParameter('runId', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/backups/runs/' + encodeURIComponent(runId) + '/download';
						method = 'GET';
						const formatParam = this.getNodeParameter('format', i, '') as string;
						if (formatParam) qs['format'] = formatParam;

					} else if (operation === 'downloadTorrentFileFromBackup') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const runId = this.getNodeParameter('runId', i) as number;
						const torrentHash = this.getNodeParameter('torrentHash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/backups/runs/' + encodeURIComponent(runId) + '/items/' + encodeURIComponent(torrentHash) + '/download';
						method = 'GET';

					} else if (operation === 'executeRestore') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const runId = this.getNodeParameter('runId', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/backups/runs/' + encodeURIComponent(runId) + '/restore';
						method = 'POST';
						body = {
							autoResumeVerified: this.getNodeParameter('autoResumeVerified', i, false) as boolean,
							dryRun: this.getNodeParameter('dryRun', i, false) as boolean,
							excludeHashes: this.getNodeParameter('excludeHashes', i, '') as object,
							mode: this.getNodeParameter('mode', i, '') as string,
							skipHashCheck: this.getNodeParameter('skipHashCheck', i, false) as boolean,
							startPaused: this.getNodeParameter('startPaused', i, false) as boolean,
						};

					} else if (operation === 'previewRestorePlan') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const runId = this.getNodeParameter('runId', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/backups/runs/' + encodeURIComponent(runId) + '/restore/preview';
						method = 'POST';
						body = {
							autoResumeVerified: this.getNodeParameter('autoResumeVerified', i, false) as boolean,
							excludeHashes: this.getNodeParameter('excludeHashes', i, '') as object,
							mode: this.getNodeParameter('mode', i, '') as string,
							skipHashCheck: this.getNodeParameter('skipHashCheck', i, false) as boolean,
							startPaused: this.getNodeParameter('startPaused', i, false) as boolean,
						};

					}
				} else if (resource === 'categories') {
					if (operation === 'deleteCategories') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/categories';
						method = 'DELETE';
						body = {
							categories: this.getNodeParameter('categories', i, '') as object,
						};

					} else if (operation === 'listCategories') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/categories';
						method = 'GET';

					} else if (operation === 'createCategory') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/categories';
						method = 'POST';
						body = {
							name: this.getNodeParameter('name', i, '') as string,
							savePath: this.getNodeParameter('savePath', i, '') as string,
						};

					} else if (operation === 'editCategory') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/categories';
						method = 'PUT';
						body = {
							name: this.getNodeParameter('name', i, '') as string,
							savePath: this.getNodeParameter('savePath', i, '') as string,
						};

					}
				} else if (resource === 'clientApiKeys') {
					if (operation === 'listClientApiKeys') {
						endpoint = 'client-api-keys';
						method = 'GET';

					} else if (operation === 'createClientApiKey') {
						endpoint = 'client-api-keys';
						method = 'POST';
						body = {
							clientName: this.getNodeParameter('clientName', i, '') as string,
							instanceId: this.getNodeParameter('instanceId', i, 0) as number,
						};

					} else if (operation === 'deleteClientApiKey') {
						const id = this.getNodeParameter('id', i) as number;
						endpoint = 'client-api-keys/' + encodeURIComponent(id);
						method = 'DELETE';

					}
				} else if (resource === 'crossseed') {
					if (operation === 'addACrossseedTorrentProvidedByAutobrr') {
						endpoint = 'cross-seed/apply';
						method = 'POST';
						const apikeyParam = this.getNodeParameter('apikey', i, '') as string;
						if (apikeyParam) qs['apikey'] = apikeyParam;
						body = {
							category: this.getNodeParameter('category', i, '') as string,
							findIndividualEpisodes: this.getNodeParameter('findIndividualEpisodes', i, false) as boolean,
							indexerName: this.getNodeParameter('indexerName', i, '') as string,
							instanceIds: this.getNodeParameter('instanceIds', i, '') as object,
							skipIfExists: this.getNodeParameter('skipIfExists', i, false) as boolean,
							startPaused: this.getNodeParameter('startPaused', i, false) as boolean,
							tags: this.getNodeParameter('tags', i, '') as object,
							torrentData: this.getNodeParameter('torrentData', i, '') as string,
						};

					} else if (operation === 'getPerInstanceCompletionSettings') {
						const instanceId = this.getNodeParameter('instanceId', i) as number;
						endpoint = 'cross-seed/completion/' + encodeURIComponent(instanceId);
						method = 'GET';

					} else if (operation === 'updatePerInstanceCompletionSettings') {
						const instanceId = this.getNodeParameter('instanceId', i) as number;
						endpoint = 'cross-seed/completion/' + encodeURIComponent(instanceId);
						method = 'PUT';
						body = {
							categories: this.getNodeParameter('categories', i, '') as object,
							enabled: this.getNodeParameter('enabled', i, false) as boolean,
							excludeCategories: this.getNodeParameter('excludeCategories', i, '') as object,
							excludeTags: this.getNodeParameter('excludeTags', i, '') as object,
							tags: this.getNodeParameter('tags', i, '') as object,
						};

					} else if (operation === 'triggerCrossseedAutomationRun') {
						endpoint = 'cross-seed/run';
						method = 'POST';
						body = {
							dryRun: this.getNodeParameter('dryRun', i, false) as boolean,
						};

					} else if (operation === 'cancelRssAutomationRun') {
						endpoint = 'cross-seed/run/cancel';
						method = 'POST';

					} else if (operation === 'listCrossseedAutomationRuns') {
						endpoint = 'cross-seed/runs';
						method = 'GET';
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;
						const offsetParam = this.getNodeParameter('offset', i, 0) as number;
						qs['offset'] = offsetParam;

					} else if (operation === 'startACrossseedSearchRun') {
						endpoint = 'cross-seed/search/run';
						method = 'POST';
						body = {
							categories: this.getNodeParameter('categories', i, '') as object,
							cooldownMinutes: this.getNodeParameter('cooldownMinutes', i, 0) as number,
							indexerIds: this.getNodeParameter('indexerIds', i, '') as object,
							instanceId: this.getNodeParameter('instanceId', i, 0) as number,
							intervalSeconds: this.getNodeParameter('intervalSeconds', i, 0) as number,
							tags: this.getNodeParameter('tags', i, '') as object,
						};

					} else if (operation === 'cancelRunningSearch') {
						endpoint = 'cross-seed/search/run/cancel';
						method = 'POST';

					} else if (operation === 'listSearchRunHistory') {
						endpoint = 'cross-seed/search/runs';
						method = 'GET';
						const instanceIdParam = this.getNodeParameter('instanceId', i, 0) as number;
						qs['instanceId'] = instanceIdParam;
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;
						const offsetParam = this.getNodeParameter('offset', i, 0) as number;
						qs['offset'] = offsetParam;

					} else if (operation === 'getSeededTorrentSearchSettings') {
						endpoint = 'cross-seed/search/settings';
						method = 'GET';

					} else if (operation === 'updateSeededTorrentSearchSettings') {
						endpoint = 'cross-seed/search/settings';
						method = 'PATCH';
						body = {
							categories: this.getNodeParameter('categories', i, '') as object,
							cooldownMinutes: this.getNodeParameter('cooldownMinutes', i, 0) as number,
							indexerIds: this.getNodeParameter('indexerIds', i, '') as object,
							instanceId: this.getNodeParameter('instanceId', i, 0) as number,
							intervalSeconds: this.getNodeParameter('intervalSeconds', i, 0) as number,
							tags: this.getNodeParameter('tags', i, '') as object,
						};

					} else if (operation === 'getSearchRunStatus') {
						endpoint = 'cross-seed/search/status';
						method = 'GET';

					} else if (operation === 'getCrossseedAutomationSettings') {
						endpoint = 'cross-seed/settings';
						method = 'GET';

					} else if (operation === 'patchCrossseedAutomationSettings') {
						endpoint = 'cross-seed/settings';
						method = 'PATCH';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					} else if (operation === 'updateCrossseedAutomationSettings') {
						endpoint = 'cross-seed/settings';
						method = 'PUT';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					} else if (operation === 'getCrossseedAutomationStatus') {
						endpoint = 'cross-seed/status';
						method = 'GET';

					} else if (operation === 'analyzeTorrentForCrossseedSearch') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'cross-seed/torrents/' + encodeURIComponent(instanceID) + '/' + encodeURIComponent(hash) + '/analyze';
						method = 'GET';

					} else if (operation === 'addTorrentsFoundViaCrossseedSearch') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'cross-seed/torrents/' + encodeURIComponent(instanceID) + '/' + encodeURIComponent(hash) + '/apply';
						method = 'POST';
						body = {
							selections: this.getNodeParameter('selections', i, '') as object,
							start_paused: this.getNodeParameter('start_paused', i, false) as boolean,
							tag_name: this.getNodeParameter('tag_name', i, '') as string,
							use_tag: this.getNodeParameter('use_tag', i, false) as boolean,
						};

					} else if (operation === 'getAsyncFilteringStatus') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'cross-seed/torrents/' + encodeURIComponent(instanceID) + '/' + encodeURIComponent(hash) + '/async-status';
						method = 'GET';

					} else if (operation === 'findLocalCrossseedMatches') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'cross-seed/torrents/' + encodeURIComponent(instanceID) + '/' + encodeURIComponent(hash) + '/local-matches';
						method = 'GET';
						const strictParam = this.getNodeParameter('strict', i, false) as boolean;
						qs['strict'] = strictParam;

					} else if (operation === 'searchCrossseedCandidatesForATorrent') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'cross-seed/torrents/' + encodeURIComponent(instanceID) + '/' + encodeURIComponent(hash) + '/search';
						method = 'POST';
						body = {
							indexer_ids: this.getNodeParameter('indexer_ids', i, '') as object,
							limit: this.getNodeParameter('limit', i, 0) as number,
							query: this.getNodeParameter('query', i, '') as string,
						};

					} else if (operation === 'checkIfAReleaseCanBeCrossseededAutobrrWebhook') {
						endpoint = 'cross-seed/webhook/check';
						method = 'POST';
						const apikeyParam = this.getNodeParameter('apikey', i, '') as string;
						if (apikeyParam) qs['apikey'] = apikeyParam;
						body = {
							findIndividualEpisodes: this.getNodeParameter('findIndividualEpisodes', i, false) as boolean,
							instanceIds: this.getNodeParameter('instanceIds', i, '') as object,
							size: this.getNodeParameter('size', i, 0) as number,
							torrentName: this.getNodeParameter('torrentName', i, '') as string,
						};

					} else if (operation === 'getCrossseedStatusForInstance') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/cross-seed/status';
						method = 'GET';

					}
				} else if (resource === 'dirScan') {
					if (operation === 'listScanDirectories') {
						endpoint = 'dir-scan/directories';
						method = 'GET';

					} else if (operation === 'createScanDirectory') {
						endpoint = 'dir-scan/directories';
						method = 'POST';
						body = {
							arrInstanceId: this.getNodeParameter('arrInstanceId', i, 0) as number,
							category: this.getNodeParameter('category', i, '') as string,
							enabled: this.getNodeParameter('enabled', i, false) as boolean,
							path: this.getNodeParameter('path', i, '') as string,
							qbitPathPrefix: this.getNodeParameter('qbitPathPrefix', i, '') as string,
							scanIntervalMinutes: this.getNodeParameter('scanIntervalMinutes', i, 0) as number,
							tags: this.getNodeParameter('tags', i, '') as object,
							targetInstanceId: this.getNodeParameter('targetInstanceId', i, 0) as number,
						};

					} else if (operation === 'deleteScanDirectory') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID);
						method = 'DELETE';

					} else if (operation === 'getScanDirectory') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID);
						method = 'GET';

					} else if (operation === 'updateScanDirectory') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID);
						method = 'PATCH';
						body = {
							arrInstanceId: this.getNodeParameter('arrInstanceId', i, 0) as number,
							category: this.getNodeParameter('category', i, '') as string,
							enabled: this.getNodeParameter('enabled', i, false) as boolean,
							path: this.getNodeParameter('path', i, '') as string,
							qbitPathPrefix: this.getNodeParameter('qbitPathPrefix', i, '') as string,
							scanIntervalMinutes: this.getNodeParameter('scanIntervalMinutes', i, 0) as number,
							tags: this.getNodeParameter('tags', i, '') as object,
							targetInstanceId: this.getNodeParameter('targetInstanceId', i, 0) as number,
						};

					} else if (operation === 'listDirectoryScanFiles') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID) + '/files';
						method = 'GET';
						const statusParam = this.getNodeParameter('status', i, '') as string;
						if (statusParam) qs['status'] = statusParam;
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;
						const offsetParam = this.getNodeParameter('offset', i, 0) as number;
						qs['offset'] = offsetParam;

					} else if (operation === 'resetDirectoryScanProgress') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID) + '/reset-files';
						method = 'POST';

					} else if (operation === 'listDirectoryScanRuns') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID) + '/runs';
						method = 'GET';
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;

					} else if (operation === 'listDirectoryScanRunInjections') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						const runID = this.getNodeParameter('runID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID) + '/runs/' + encodeURIComponent(runID) + '/injections';
						method = 'GET';
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;
						const offsetParam = this.getNodeParameter('offset', i, 0) as number;
						qs['offset'] = offsetParam;

					} else if (operation === 'cancelADirectoryScan') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID) + '/scan';
						method = 'DELETE';

					} else if (operation === 'triggerADirectoryScan') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID) + '/scan';
						method = 'POST';

					} else if (operation === 'getDirectoryScanStatus') {
						const directoryID = this.getNodeParameter('directoryID', i) as number;
						endpoint = 'dir-scan/directories/' + encodeURIComponent(directoryID) + '/status';
						method = 'GET';

					} else if (operation === 'getDirScanSettings') {
						endpoint = 'dir-scan/settings';
						method = 'GET';

					} else if (operation === 'updateDirScanSettings') {
						endpoint = 'dir-scan/settings';
						method = 'PATCH';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					}
				} else if (resource === 'externalPrograms') {
					if (operation === 'listExternalPrograms') {
						endpoint = 'external-programs';
						method = 'GET';

					} else if (operation === 'createExternalProgram') {
						endpoint = 'external-programs';
						method = 'POST';
						body = {
							args_template: this.getNodeParameter('args_template', i, '') as string,
							enabled: this.getNodeParameter('enabled', i, false) as boolean,
							name: this.getNodeParameter('name', i, '') as string,
							path: this.getNodeParameter('path', i, '') as string,
							path_mappings: this.getNodeParameter('path_mappings', i, '') as object,
							use_terminal: this.getNodeParameter('use_terminal', i, false) as boolean,
						};

					} else if (operation === 'executeExternalProgram') {
						endpoint = 'external-programs/execute';
						method = 'POST';
						body = {
							hashes: this.getNodeParameter('hashes', i, '') as object,
							instance_id: this.getNodeParameter('instance_id', i, 0) as number,
							program_id: this.getNodeParameter('program_id', i, 0) as number,
						};

					} else if (operation === 'deleteExternalProgram') {
						const id = this.getNodeParameter('id', i) as number;
						endpoint = 'external-programs/' + encodeURIComponent(id);
						method = 'DELETE';

					} else if (operation === 'updateExternalProgram') {
						const id = this.getNodeParameter('id', i) as number;
						endpoint = 'external-programs/' + encodeURIComponent(id);
						method = 'PUT';
						body = {
							args_template: this.getNodeParameter('args_template', i, '') as string,
							enabled: this.getNodeParameter('enabled', i, false) as boolean,
							name: this.getNodeParameter('name', i, '') as string,
							path: this.getNodeParameter('path', i, '') as string,
							path_mappings: this.getNodeParameter('path_mappings', i, '') as object,
							use_terminal: this.getNodeParameter('use_terminal', i, false) as boolean,
						};

					}
				} else if (resource === 'instances') {
					if (operation === 'listInstances') {
						endpoint = 'instances';
						method = 'GET';

					} else if (operation === 'addInstance') {
						endpoint = 'instances';
						method = 'POST';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					} else if (operation === 'reorderInstances') {
						endpoint = 'instances/order';
						method = 'PUT';
						body = {
							instanceIds: this.getNodeParameter('instanceIds', i, '') as object,
						};

					} else if (operation === 'deleteInstance') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID);
						method = 'DELETE';

					} else if (operation === 'updateInstance') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID);
						method = 'PUT';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					} else if (operation === 'getAlternativeSpeedLimitsStatus') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/alternative-speed-limits';
						method = 'GET';

					} else if (operation === 'toggleAlternativeSpeedLimits') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/alternative-speed-limits/toggle';
						method = 'POST';

					} else if (operation === 'getQbittorrentApplicationInfo') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/app-info';
						method = 'GET';

					} else if (operation === 'getInstanceCapabilities') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/capabilities';
						method = 'GET';

					} else if (operation === 'getDirectoryContents') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/getDirectoryContent';
						method = 'GET';
						const dirPathParam = this.getNodeParameter('dirPath', i, '') as string;
						if (dirPathParam) qs['dirPath'] = dirPathParam;
						const withMetadataParam = this.getNodeParameter('withMetadata', i, false) as boolean;
						qs['withMetadata'] = withMetadataParam;

					} else if (operation === 'getInstancePreferences') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/preferences';
						method = 'GET';

					} else if (operation === 'updateInstancePreferences') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/preferences';
						method = 'PATCH';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					} else if (operation === 'getRecentTrackerReannounceActivity') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/reannounce/activity';
						method = 'GET';
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;

					} else if (operation === 'getCurrentTrackerReannounceCandidates') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/reannounce/candidates';
						method = 'GET';

					} else if (operation === 'updateInstanceStatus') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/status';
						method = 'PUT';
						body = {
							isActive: this.getNodeParameter('isActive', i, false) as boolean,
						};

					} else if (operation === 'testConnection') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/test';
						method = 'POST';

					}
				} else if (resource === 'licenses') {
					if (operation === 'activateLicense') {
						endpoint = 'license/activate';
						method = 'POST';
						body = {
							licenseKey: this.getNodeParameter('licenseKey', i, '') as string,
						};

					} else if (operation === 'checkPremiumAccess') {
						endpoint = 'license/licensed';
						method = 'GET';

					} else if (operation === 'listLicenses') {
						endpoint = 'license/licenses';
						method = 'GET';

					} else if (operation === 'refreshLicenses') {
						endpoint = 'license/refresh';
						method = 'POST';

					} else if (operation === 'validateLicense') {
						endpoint = 'license/validate';
						method = 'POST';
						body = {
							licenseKey: this.getNodeParameter('licenseKey', i, '') as string,
						};

					} else if (operation === 'deleteLicense') {
						const licenseKey = this.getNodeParameter('licenseKey', i) as string;
						endpoint = 'license/' + encodeURIComponent(licenseKey);
						method = 'DELETE';

					}
				} else if (resource === 'orphanScan') {
					if (operation === 'listOrphanScanRuns') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/orphan-scan/runs';
						method = 'GET';
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;

					} else if (operation === 'cancelOrphanScanRun') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const runID = this.getNodeParameter('runID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/orphan-scan/runs/' + encodeURIComponent(runID);
						method = 'DELETE';

					} else if (operation === 'getOrphanScanRun') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const runID = this.getNodeParameter('runID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/orphan-scan/runs/' + encodeURIComponent(runID);
						method = 'GET';
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;
						const offsetParam = this.getNodeParameter('offset', i, 0) as number;
						qs['offset'] = offsetParam;

					} else if (operation === 'confirmOrphanFileDeletion') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const runID = this.getNodeParameter('runID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/orphan-scan/runs/' + encodeURIComponent(runID) + '/confirm';
						method = 'POST';

					} else if (operation === 'triggerOrphanScan') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/orphan-scan/scan';
						method = 'POST';

					} else if (operation === 'getOrphanScanSettings') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/orphan-scan/settings';
						method = 'GET';

					} else if (operation === 'updateOrphanScanSettings') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/orphan-scan/settings';
						method = 'PUT';
						body = {
							enabled: this.getNodeParameter('enabled', i, false) as boolean,
							gracePeriodMinutes: this.getNodeParameter('gracePeriodMinutes', i, 0) as number,
							ignorePaths: this.getNodeParameter('ignorePaths', i, '') as object,
							maxFilesPerRun: this.getNodeParameter('maxFilesPerRun', i, 0) as number,
							previewSort: this.getNodeParameter('previewSort', i, '') as string,
							scanIntervalHours: this.getNodeParameter('scanIntervalHours', i, 0) as number,
						};

					}
				} else if (resource === 'rss') {
					if (operation === 'markArticlesAsRead') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/articles/read';
						method = 'POST';
						body = {
							articleId: this.getNodeParameter('articleId', i, '') as string,
							itemPath: this.getNodeParameter('itemPath', i, '') as string,
						};

					} else if (operation === 'addRssFeed') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/feeds';
						method = 'POST';
						body = {
							path: this.getNodeParameter('path', i, '') as string,
							url: this.getNodeParameter('url', i, '') as string,
						};

					} else if (operation === 'setFeedUrl') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/feeds/url';
						method = 'PUT';
						body = {
							path: this.getNodeParameter('path', i, '') as string,
							url: this.getNodeParameter('url', i, '') as string,
						};

					} else if (operation === 'createRssFolder') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/folders';
						method = 'POST';
						body = {
							path: this.getNodeParameter('path', i, '') as string,
						};

					} else if (operation === 'removeRssItem') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/items';
						method = 'DELETE';
						body = {
							path: this.getNodeParameter('path', i, '') as string,
						};

					} else if (operation === 'getRssItems') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/items';
						method = 'GET';
						const withDataParam = this.getNodeParameter('withData', i, false) as boolean;
						qs['withData'] = withDataParam;

					} else if (operation === 'moveRssItem') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/items/move';
						method = 'POST';
						body = {
							destPath: this.getNodeParameter('destPath', i, '') as string,
							itemPath: this.getNodeParameter('itemPath', i, '') as string,
						};

					} else if (operation === 'refreshRssItem') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/items/refresh';
						method = 'POST';
						body = {
							itemPath: this.getNodeParameter('itemPath', i, '') as string,
						};

					} else if (operation === 'getRssRules') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/rules';
						method = 'GET';

					} else if (operation === 'createOrUpdateRssRule') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/rules';
						method = 'POST';
						body = {
							name: this.getNodeParameter('name', i, '') as string,
							rule: this.getNodeParameter('rule', i, '') as object,
						};

					} else if (operation === 'reprocessRssRules') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/rules/reprocess';
						method = 'POST';

					} else if (operation === 'deleteRssRule') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const ruleName = this.getNodeParameter('ruleName', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/rules/' + encodeURIComponent(ruleName);
						method = 'DELETE';

					} else if (operation === 'previewRssRuleMatches') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const ruleName = this.getNodeParameter('ruleName', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/rules/' + encodeURIComponent(ruleName) + '/preview';
						method = 'GET';

					} else if (operation === 'renameRssRule') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const ruleName = this.getNodeParameter('ruleName', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/rss/rules/' + encodeURIComponent(ruleName) + '/rename';
						method = 'PUT';
						body = {
							newName: this.getNodeParameter('newName', i, '') as string,
						};

					}
				} else if (resource === 'system') {
					if (operation === 'getLogExclusions') {
						endpoint = 'log-exclusions';
						method = 'GET';

					} else if (operation === 'updateLogExclusions') {
						endpoint = 'log-exclusions';
						method = 'PUT';
						body = {
							patterns: this.getNodeParameter('patterns', i, '') as object,
						};

					} else if (operation === 'getLogSettings') {
						endpoint = 'log-settings';
						method = 'GET';

					} else if (operation === 'updateLogSettings') {
						endpoint = 'log-settings';
						method = 'PUT';
						body = {
							level: this.getNodeParameter('level', i, '') as string,
							maxBackups: this.getNodeParameter('maxBackups', i, 0) as number,
							maxSize: this.getNodeParameter('maxSize', i, 0) as number,
							path: this.getNodeParameter('path', i, '') as string,
						};

					} else if (operation === 'checkForLatestVersion') {
						endpoint = 'version/latest';
						method = 'GET';

					} else if (operation === 'healthCheck') {
						endpoint = '/health';
						method = 'GET';

					} else if (operation === 'livenessProbe') {
						endpoint = '/healthz/liveness';
						method = 'GET';

					} else if (operation === 'readinessProbe') {
						endpoint = '/healthz/readiness';
						method = 'GET';

					}
				} else if (resource === 'tags') {
					if (operation === 'deleteTags') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/tags';
						method = 'DELETE';
						body = {
							tags: this.getNodeParameter('tags', i, '') as object,
						};

					} else if (operation === 'listTags') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/tags';
						method = 'GET';

					} else if (operation === 'createTags') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/tags';
						method = 'POST';
						body = {
							tags: this.getNodeParameter('tags', i, '') as object,
						};

					}
				} else if (resource === 'torrentDetails') {
					if (operation === 'exportTorrentFile') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/export';
						method = 'GET';

					} else if (operation === 'getTorrentFiles') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/files';
						method = 'GET';
						const refreshParam = this.getNodeParameter('refresh', i, false) as boolean;
						qs['refresh'] = refreshParam;

					} else if (operation === 'updateTorrentFilePriorities') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/files';
						method = 'PUT';
						body = {
							indices: this.getNodeParameter('indices', i, '') as object,
							priority: this.getNodeParameter('priority', i, 0) as number,
						};

					} else if (operation === 'getTorrentPeers') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/peers';
						method = 'GET';

					} else if (operation === 'getTorrentPieceStates') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/pieces';
						method = 'GET';

					} else if (operation === 'getTorrentProperties') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/properties';
						method = 'GET';

					} else if (operation === 'renameTorrent') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/rename';
						method = 'PUT';
						body = {
							name: this.getNodeParameter('name', i, '') as string,
						};

					} else if (operation === 'renameTorrentFile') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/rename-file';
						method = 'PUT';
						body = {
							newPath: this.getNodeParameter('newPath', i, '') as string,
							oldPath: this.getNodeParameter('oldPath', i, '') as string,
						};

					} else if (operation === 'renameTorrentFolder') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/rename-folder';
						method = 'PUT';
						body = {
							newPath: this.getNodeParameter('newPath', i, '') as string,
							oldPath: this.getNodeParameter('oldPath', i, '') as string,
						};

					} else if (operation === 'removeTorrentTrackers') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/trackers';
						method = 'DELETE';
						body = {
							urls: this.getNodeParameter('urls', i, '') as string,
						};

					} else if (operation === 'getTorrentTrackers') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/trackers';
						method = 'GET';

					} else if (operation === 'addTorrentTrackers') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/trackers';
						method = 'POST';
						body = {
							urls: this.getNodeParameter('urls', i, '') as string,
						};

					} else if (operation === 'editTorrentTracker') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/trackers';
						method = 'PUT';
						body = {
							newURL: this.getNodeParameter('newURL', i, '') as string,
							oldURL: this.getNodeParameter('oldURL', i, '') as string,
						};

					} else if (operation === 'getTorrentWebSeeds') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const hash = this.getNodeParameter('hash', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/' + encodeURIComponent(hash) + '/webseeds';
						method = 'GET';

					}
				} else if (resource === 'torrents') {
					if (operation === 'createTorrent') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrent-creator';
						method = 'POST';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					} else if (operation === 'getActiveTorrentCreationTaskCount') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrent-creator/count';
						method = 'GET';

					} else if (operation === 'getTorrentCreationStatus') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrent-creator/status';
						method = 'GET';
						const taskIDParam = this.getNodeParameter('taskID', i, '') as string;
						if (taskIDParam) qs['taskID'] = taskIDParam;

					} else if (operation === 'deleteTorrentCreationTask') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const taskID = this.getNodeParameter('taskID', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrent-creator/' + encodeURIComponent(taskID);
						method = 'DELETE';

					} else if (operation === 'downloadCreatedTorrentFile') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						const taskID = this.getNodeParameter('taskID', i) as string;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrent-creator/' + encodeURIComponent(taskID) + '/file';
						method = 'GET';

					} else if (operation === 'listTorrents') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents';
						method = 'GET';
						const pageParam = this.getNodeParameter('page', i, 0) as number;
						qs['page'] = pageParam;
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;
						const sortParam = this.getNodeParameter('sort', i, '') as string;
						if (sortParam) qs['sort'] = sortParam;
						const orderParam = this.getNodeParameter('order', i, '') as string;
						if (orderParam) qs['order'] = orderParam;
						const searchParam = this.getNodeParameter('search', i, '') as string;
						if (searchParam) qs['search'] = searchParam;
						const filtersParam = this.getNodeParameter('filters', i, '') as string;
						if (filtersParam) qs['filters'] = filtersParam;

					} else if (operation === 'addTorrent') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents';
						method = 'POST';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					} else if (operation === 'addPeersToTorrents') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/add-peers';
						method = 'POST';
						body = {
							hashes: this.getNodeParameter('hashes', i, '') as object,
							peers: this.getNodeParameter('peers', i, '') as object,
						};

					} else if (operation === 'banPeersPermanently') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/ban-peers';
						method = 'POST';
						body = {
							peers: this.getNodeParameter('peers', i, '') as object,
						};

					} else if (operation === 'bulkTorrentAction') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/bulk-action';
						method = 'POST';
						const bodyJson = this.getNodeParameter('body', i, '{}') as string;
						body = typeof bodyJson === 'string' ? JSON.parse(bodyJson) as object : bodyJson as object;

					} else if (operation === 'checkForDuplicateTorrents') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/torrents/check-duplicates';
						method = 'POST';
						body = {
							hashes: this.getNodeParameter('hashes', i, '') as object,
						};

					} else if (operation === 'listTorrentsAcrossAllInstances') {
						endpoint = 'torrents/cross-instance';
						method = 'GET';
						const pageParam = this.getNodeParameter('page', i, 0) as number;
						qs['page'] = pageParam;
						const limitParam = this.getNodeParameter('limit', i, 0) as number;
						qs['limit'] = limitParam;
						const sortParam = this.getNodeParameter('sort', i, '') as string;
						if (sortParam) qs['sort'] = sortParam;
						const orderParam = this.getNodeParameter('order', i, '') as string;
						if (orderParam) qs['order'] = orderParam;
						const searchParam = this.getNodeParameter('search', i, '') as string;
						if (searchParam) qs['search'] = searchParam;
						const filtersParam = this.getNodeParameter('filters', i, '') as string;
						if (filtersParam) qs['filters'] = filtersParam;

					}
				} else if (resource === 'trackerIcons') {
					if (operation === 'listTrackerIcons') {
						endpoint = 'tracker-icons';
						method = 'GET';

					}
				} else if (resource === 'trackers') {
					if (operation === 'listActiveTrackers') {
						const instanceID = this.getNodeParameter('instanceID', i) as number;
						endpoint = 'instances/' + encodeURIComponent(instanceID) + '/trackers';
						method = 'GET';

					}
				}

				const options = {
					method,
					url: `${baseUrl}/api/${endpoint}`,
					headers: {
						'X-API-Key': credentials.apiKey as string,
						'Content-Type': 'application/json',
					},
					body,
					qs,
					json: true,
				};

				const response = await this.helpers.httpRequest(options);

				if (Array.isArray(response)) {
					for (const item of response) {
						returnData.push({ json: item as IDataObject });
					}
				} else if (response !== null && response !== undefined) {
					returnData.push({ json: response as IDataObject });
				} else {
					returnData.push({ json: { success: true } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
