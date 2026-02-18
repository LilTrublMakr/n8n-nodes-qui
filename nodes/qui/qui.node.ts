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
		icon: 'file:qui.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the QUI API to manage multiple qBittorrent instances',
		defaults: {
			name: 'QUI',
		},
		inputs: ['main'],
		outputs: ['main'],
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
						name: 'List API keys',
						value: 'listApiKeys',
						description: 'Get all API keys for the current user',
						action: 'list api keys',
					},
					{
						name: 'Create API key',
						value: 'createApiKey',
						description: 'Generate a new API key',
						action: 'create api key',
					},
					{
						name: 'Delete API key',
						value: 'deleteApiKey',
						description: 'Revoke an API key',
						action: 'delete api key',
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
						name: 'List ARR instances',
						value: 'listArrInstances',
						description: 'Get all configured Sonarr/Radarr instances',
						action: 'list arr instances',
					},
					{
						name: 'Create ARR instance',
						value: 'createArrInstance',
						description: 'Add a new Sonarr or Radarr instance configuration',
						action: 'create arr instance',
					},
					{
						name: 'Delete ARR instance',
						value: 'deleteArrInstance',
						description: 'Delete an ARR instance configuration',
						action: 'delete arr instance',
					},
					{
						name: 'Get ARR instance',
						value: 'getArrInstance',
						description: 'Get a single Sonarr/Radarr instance by ID',
						action: 'get arr instance',
					},
					{
						name: 'Update ARR instance',
						value: 'updateArrInstance',
						description: 'Update an existing Sonarr/Radarr instance configuration',
						action: 'update arr instance',
					},
					{
						name: 'Test ARR instance',
						value: 'testArrInstance',
						description: 'Test connectivity to an existing ARR instance',
						action: 'test arr instance',
					},
					{
						name: 'Resolve title to external IDs',
						value: 'resolveTitleToExternalIds',
						description: 'Use configured ARR instances to resolve a title to external IDs (IMDb, TMDb, TVDb, TVMaze)',
						action: 'resolve title to external ids',
					},
					{
						name: 'Test ARR connection',
						value: 'testArrConnection',
						description: 'Test connectivity to an ARR instance before saving',
						action: 'test arr connection',
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
						name: 'Change password',
						value: 'changePassword',
						description: 'Change the current user\'s password',
						action: 'change password',
					},
					{
						name: 'Check setup status',
						value: 'checkSetupStatus',
						description: 'Check if initial setup is required',
						action: 'check setup status',
					},
					{
						name: 'Login',
						value: 'login',
						description: 'Authenticate with username and password',
						action: 'login',
					},
					{
						name: 'Logout',
						value: 'logout',
						description: 'End the current session',
						action: 'logout',
					},
					{
						name: 'Get current user',
						value: 'getCurrentUser',
						description: 'Get information about the authenticated user',
						action: 'get current user',
					},
					{
						name: 'Initial setup',
						value: 'initialSetup',
						description: 'Create the initial admin user (only available before first user is created)',
						action: 'initial setup',
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
						name: 'Import backup manifest',
						value: 'importBackupManifest',
						description: 'Import a backup manifest file to create a new backup run record. This allows restoring backup metadata from a previously exported manifest.',
						action: 'import backup manifest',
					},
					{
						name: 'Download backup archive',
						value: 'downloadBackupArchive',
						description: 'Download the backup archive for the specified backup run in the requested format.',
						action: 'download backup archive',
					},
					{
						name: 'Download torrent file from backup',
						value: 'downloadTorrentFileFromBackup',
						description: 'Download a specific torrent file from the backup archive.',
						action: 'download torrent file from backup',
					},
					{
						name: 'Execute restore',
						value: 'executeRestore',
						description: 'Execute the restore plan for the specified backup run.',
						action: 'execute restore',
					},
					{
						name: 'Preview restore plan',
						value: 'previewRestorePlan',
						description: 'Build a restore plan for the specified backup run without applying any changes.',
						action: 'preview restore plan',
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
						name: 'Delete categories',
						value: 'deleteCategories',
						description: 'Delete one or more categories',
						action: 'delete categories',
					},
					{
						name: 'List categories',
						value: 'listCategories',
						description: 'Get all categories',
						action: 'list categories',
					},
					{
						name: 'Create category',
						value: 'createCategory',
						description: 'Create a new category',
						action: 'create category',
					},
					{
						name: 'Edit category',
						value: 'editCategory',
						description: 'Edit an existing category',
						action: 'edit category',
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
						name: 'List client API keys',
						value: 'listClientApiKeys',
						description: 'Get all client API keys for external applications',
						action: 'list client api keys',
					},
					{
						name: 'Create client API key',
						value: 'createClientApiKey',
						description: 'Generate a new client API key for external applications',
						action: 'create client api key',
					},
					{
						name: 'Delete client API key',
						value: 'deleteClientApiKey',
						description: 'Revoke a client API key',
						action: 'delete client api key',
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
						name: 'Add a cross-seed torrent provided by autobrr',
						value: 'addACrossseedTorrentProvidedByAutobrr',
						description: 'Accepts a torrent file from autobrr, matches it against the requested instances, and adds it with alignment wherever a complete match exists. When `instanceIds` is omitted or empty, qui attempts to...',
						action: 'add a cross-seed torrent provided by autobrr',
					},
					{
						name: 'Get per-instance completion settings',
						value: 'getPerinstanceCompletionSettings',
						description: 'Returns the cross-seed completion settings for a specific qBittorrent instance. These settings control automatic cross-seed searches when torrents complete on this instance.',
						action: 'get per-instance completion settings',
					},
					{
						name: 'Update per-instance completion settings',
						value: 'updatePerinstanceCompletionSettings',
						description: 'Updates the cross-seed completion settings for a specific qBittorrent instance. These settings control automatic cross-seed searches when torrents complete on this instance.',
						action: 'update per-instance completion settings',
					},
					{
						name: 'Trigger cross-seed automation run',
						value: 'triggerCrossseedAutomationRun',
						description: 'Starts an on-demand automation pass',
						action: 'trigger cross-seed automation run',
					},
					{
						name: 'Cancel RSS automation run',
						value: 'cancelRssAutomationRun',
						description: 'Stops the currently running RSS automation run, if any.',
						action: 'cancel rss automation run',
					},
					{
						name: 'List cross-seed automation runs',
						value: 'listCrossseedAutomationRuns',
						description: 'Returns the most recent automation runs',
						action: 'list cross-seed automation runs',
					},
					{
						name: 'Start a cross-seed search run',
						value: 'startACrossseedSearchRun',
						description: 'Starts a new cross-seed search automation run for the specified instance',
						action: 'start a cross-seed search run',
					},
					{
						name: 'Cancel running search',
						value: 'cancelRunningSearch',
						description: 'Cancels the currently running cross-seed search automation',
						action: 'cancel running search',
					},
					{
						name: 'List search run history',
						value: 'listSearchRunHistory',
						description: 'Returns the history of cross-seed search automation runs for an instance',
						action: 'list search run history',
					},
					{
						name: 'Get seeded torrent search settings',
						value: 'getSeededTorrentSearchSettings',
						description: 'Returns the persisted defaults used by Seeded Torrent Search runs.',
						action: 'get seeded torrent search settings',
					},
					{
						name: 'Update seeded torrent search settings',
						value: 'updateSeededTorrentSearchSettings',
						description: 'Persists default filters and timing for Seeded Torrent Search runs.',
						action: 'update seeded torrent search settings',
					},
					{
						name: 'Get search run status',
						value: 'getSearchRunStatus',
						description: 'Returns the current status of the cross-seed search automation',
						action: 'get search run status',
					},
					{
						name: 'Get cross-seed automation settings',
						value: 'getCrossseedAutomationSettings',
						description: 'Retrieve the current automation configuration for cross-seeding',
						action: 'get cross-seed automation settings',
					},
					{
						name: 'Patch cross-seed automation settings',
						value: 'patchCrossseedAutomationSettings',
						description: 'Partially update automation, completion, or global cross-seed settings without overwriting unspecified fields',
						action: 'patch cross-seed automation settings',
					},
					{
						name: 'Update cross-seed automation settings',
						value: 'updateCrossseedAutomationSettings',
						description: 'Persist a new automation schedule and cross-seed preferences',
						action: 'update cross-seed automation settings',
					},
					{
						name: 'Get cross-seed automation status',
						value: 'getCrossseedAutomationStatus',
						description: 'Returns scheduler state, last run information, and next scheduled run',
						action: 'get cross-seed automation status',
					},
					{
						name: 'Analyze torrent for cross-seed search',
						value: 'analyzeTorrentForCrossseedSearch',
						description: 'Analyzes a torrent and returns information needed for cross-seed searching',
						action: 'analyze torrent for cross-seed search',
					},
					{
						name: 'Add torrents found via cross-seed search',
						value: 'addTorrentsFoundViaCrossseedSearch',
						description: 'Downloads selected results and queues them for cross-seeding on the specified instance',
						action: 'add torrents found via cross-seed search',
					},
					{
						name: 'Get async filtering status',
						value: 'getAsyncFilteringStatus',
						description: 'Returns the current async filtering progress for a torrent, including whether content filtering has completed',
						action: 'get async filtering status',
					},
					{
						name: 'Find local cross-seed matches',
						value: 'findLocalCrossseedMatches',
						description: 'Find torrents across all qBittorrent instances that match the specified torrent (by content path, name, or release metadata)',
						action: 'find local cross-seed matches',
					},
					{
						name: 'Search cross-seed candidates for a torrent',
						value: 'searchCrossseedCandidatesForATorrent',
						description: 'Query configured Torznab indexers for releases matching an existing torrent',
						action: 'search cross-seed candidates for a torrent',
					},
					{
						name: 'Check if a release can be cross-seeded (autobrr webhook)',
						value: 'checkIfAReleaseCanBeCrossseededAutobrrWebhook',
						description: 'Accepts release metadata from autobrr and checks if matching torrents exist on the requested instances (or all instances when no list is provided). The HTTP status describes whether the match is re...',
						action: 'check if a release can be cross-seeded (autobrr webhook)',
					},
					{
						name: 'Get cross-seed status for instance',
						value: 'getCrossseedStatusForInstance',
						description: 'Get cross-seed statistics and status for a specific qBittorrent instance',
						action: 'get cross-seed status for instance',
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
						name: 'List scan directories',
						value: 'listScanDirectories',
						description: 'Returns all configured scan directories',
						action: 'list scan directories',
					},
					{
						name: 'Create scan directory',
						value: 'createScanDirectory',
						description: 'Creates a new scan directory configuration',
						action: 'create scan directory',
					},
					{
						name: 'Delete scan directory',
						value: 'deleteScanDirectory',
						description: 'Deletes a scan directory configuration and all associated history',
						action: 'delete scan directory',
					},
					{
						name: 'Get scan directory',
						value: 'getScanDirectory',
						description: 'Returns a scan directory by ID',
						action: 'get scan directory',
					},
					{
						name: 'Update scan directory',
						value: 'updateScanDirectory',
						description: 'Partially updates a scan directory configuration',
						action: 'update scan directory',
					},
					{
						name: 'List directory scan files',
						value: 'listDirectoryScanFiles',
						description: 'Returns tracked files for a directory with optional status filtering',
						action: 'list directory scan files',
					},
					{
						name: 'Reset directory scan progress',
						value: 'resetDirectoryScanProgress',
						description: 'Deletes tracked dir-scan file state for the directory so the next scan re-processes it',
						action: 'reset directory scan progress',
					},
					{
						name: 'List directory scan runs',
						value: 'listDirectoryScanRuns',
						description: 'Returns recent scan runs for a directory',
						action: 'list directory scan runs',
					},
					{
						name: 'List directory scan run injections',
						value: 'listDirectoryScanRunInjections',
						description: 'Returns injection attempts (added/failed) for a scan run',
						action: 'list directory scan run injections',
					},
					{
						name: 'Cancel a directory scan',
						value: 'cancelADirectoryScan',
						description: 'Cancels the currently running scan for the given directory, if any',
						action: 'cancel a directory scan',
					},
					{
						name: 'Trigger a directory scan',
						value: 'triggerADirectoryScan',
						description: 'Starts a manual scan run for the given directory',
						action: 'trigger a directory scan',
					},
					{
						name: 'Get directory scan status',
						value: 'getDirectoryScanStatus',
						description: 'Returns the status of the active scan run or the most recent run (or idle)',
						action: 'get directory scan status',
					},
					{
						name: 'Get dir scan settings',
						value: 'getDirScanSettings',
						description: 'Returns the global directory scanner configuration',
						action: 'get dir scan settings',
					},
					{
						name: 'Update dir scan settings',
						value: 'updateDirScanSettings',
						description: 'Partially updates global directory scanner settings',
						action: 'update dir scan settings',
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
						name: 'List external programs',
						value: 'listExternalPrograms',
						description: 'Get all configured external programs',
						action: 'list external programs',
					},
					{
						name: 'Create external program',
						value: 'createExternalProgram',
						description: 'Add a new external program configuration',
						action: 'create external program',
					},
					{
						name: 'Execute external program',
						value: 'executeExternalProgram',
						description: 'Execute an external program for one or more torrents.',
						action: 'execute external program',
					},
					{
						name: 'Delete external program',
						value: 'deleteExternalProgram',
						description: 'Delete an external program configuration',
						action: 'delete external program',
					},
					{
						name: 'Update external program',
						value: 'updateExternalProgram',
						description: 'Update an external program configuration',
						action: 'update external program',
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
						name: 'List instances',
						value: 'listInstances',
						description: 'Get all configured qBittorrent instances',
						action: 'list instances',
					},
					{
						name: 'Add instance',
						value: 'addInstance',
						description: 'Add a new qBittorrent instance',
						action: 'add instance',
					},
					{
						name: 'Reorder instances',
						value: 'reorderInstances',
						description: 'Update the display order for all configured instances. The list must include every instance ID exactly once.',
						action: 'reorder instances',
					},
					{
						name: 'Delete instance',
						value: 'deleteInstance',
						description: 'Remove a qBittorrent instance',
						action: 'delete instance',
					},
					{
						name: 'Update instance',
						value: 'updateInstance',
						description: 'Update instance configuration',
						action: 'update instance',
					},
					{
						name: 'Get alternative speed limits status',
						value: 'getAlternativeSpeedLimitsStatus',
						description: 'Get current status of alternative speed limits (turtle mode)',
						action: 'get alternative speed limits status',
					},
					{
						name: 'Toggle alternative speed limits',
						value: 'toggleAlternativeSpeedLimits',
						description: 'Toggle alternative speed limits (turtle mode) on/off',
						action: 'toggle alternative speed limits',
					},
					{
						name: 'Get qBittorrent application info',
						value: 'getQbittorrentApplicationInfo',
						description: 'Get qBittorrent version and build information for an instance',
						action: 'get qbittorrent application info',
					},
					{
						name: 'Get instance capabilities',
						value: 'getInstanceCapabilities',
						description: 'Retrieve lightweight capability metadata for a qBittorrent instance.',
						action: 'get instance capabilities',
					},
					{
						name: 'Get directory contents',
						value: 'getDirectoryContents',
						description: 'Retrieve directory contents from the qBittorrent host filesystem for path autocomplete.',
						action: 'get directory contents',
					},
					{
						name: 'Get instance preferences',
						value: 'getInstancePreferences',
						description: 'Get qBittorrent instance preferences/settings',
						action: 'get instance preferences',
					},
					{
						name: 'Update instance preferences',
						value: 'updateInstancePreferences',
						description: 'Update qBittorrent instance preferences/settings',
						action: 'update instance preferences',
					},
					{
						name: 'Get recent tracker reannounce activity',
						value: 'getRecentTrackerReannounceActivity',
						description: 'Return the most recent tracker reannounce events for an instance.',
						action: 'get recent tracker reannounce activity',
					},
					{
						name: 'Get current tracker reannounce candidates',
						value: 'getCurrentTrackerReannounceCandidates',
						description: 'Return torrents that currently fall within the reannounce monitoring scope and have problematic or pending trackers.',
						action: 'get current tracker reannounce candidates',
					},
					{
						name: 'Update instance status',
						value: 'updateInstanceStatus',
						description: 'Enable or disable automatic polling for the specified instance',
						action: 'update instance status',
					},
					{
						name: 'Test connection',
						value: 'testConnection',
						description: 'Test connection to a qBittorrent instance',
						action: 'test connection',
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
						name: 'Activate license',
						value: 'activateLicense',
						description: 'Activate a license key and store it for the current user',
						action: 'activate license',
					},
					{
						name: 'Check premium access',
						value: 'checkPremiumAccess',
						description: 'Check if any active licenses grant premium access',
						action: 'check premium access',
					},
					{
						name: 'List licenses',
						value: 'listLicenses',
						description: 'List all stored licenses',
						action: 'list licenses',
					},
					{
						name: 'Refresh licenses',
						value: 'refreshLicenses',
						description: 'Refresh all stored licenses from the licensing service',
						action: 'refresh licenses',
					},
					{
						name: 'Validate license',
						value: 'validateLicense',
						description: 'Validate a license key and ensure it remains active',
						action: 'validate license',
					},
					{
						name: 'Delete license',
						value: 'deleteLicense',
						description: 'Remove a stored license',
						action: 'delete license',
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
						name: 'List orphan scan runs',
						value: 'listOrphanScanRuns',
						description: 'Get recent orphan scan runs for an instance. Requires local filesystem access.',
						action: 'list orphan scan runs',
					},
					{
						name: 'Cancel orphan scan run',
						value: 'cancelOrphanScanRun',
						description: 'Cancel a pending, scanning, or preview_ready run. Cannot cancel runs that are actively deleting. Requires local filesystem access.',
						action: 'cancel orphan scan run',
					},
					{
						name: 'Get orphan scan run',
						value: 'getOrphanScanRun',
						description: 'Get details of a specific scan run including the list of orphan files found. Requires local filesystem access.',
						action: 'get orphan scan run',
					},
					{
						name: 'Confirm orphan file deletion',
						value: 'confirmOrphanFileDeletion',
						description: 'Confirm deletion of orphan files from a preview_ready run. This initiates the actual file deletion. Requires local filesystem access.',
						action: 'confirm orphan file deletion',
					},
					{
						name: 'Trigger orphan scan',
						value: 'triggerOrphanScan',
						description: 'Start a manual orphan file scan for an instance. Returns immediately with the run ID.',
						action: 'trigger orphan scan',
					},
					{
						name: 'Get orphan scan settings',
						value: 'getOrphanScanSettings',
						description: 'Get orphan file scanning settings for an instance. Requires local filesystem access.',
						action: 'get orphan scan settings',
					},
					{
						name: 'Update orphan scan settings',
						value: 'updateOrphanScanSettings',
						description: 'Update orphan file scanning settings for an instance. Requires local filesystem access.',
						action: 'update orphan scan settings',
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
						name: 'Mark articles as read',
						value: 'markArticlesAsRead',
						description: 'Mark RSS articles as read',
						action: 'mark articles as read',
					},
					{
						name: 'Add RSS feed',
						value: 'addRssFeed',
						description: 'Add a new RSS feed',
						action: 'add rss feed',
					},
					{
						name: 'Set feed URL',
						value: 'setFeedUrl',
						description: 'Change the URL of an existing RSS feed',
						action: 'set feed url',
					},
					{
						name: 'Create RSS folder',
						value: 'createRssFolder',
						description: 'Create a new RSS folder',
						action: 'create rss folder',
					},
					{
						name: 'Remove RSS item',
						value: 'removeRssItem',
						description: 'Remove an RSS feed or folder',
						action: 'remove rss item',
					},
					{
						name: 'Get RSS items',
						value: 'getRssItems',
						description: 'Retrieve all RSS feeds and folders for an instance',
						action: 'get rss items',
					},
					{
						name: 'Move RSS item',
						value: 'moveRssItem',
						description: 'Move an RSS feed or folder to a new location',
						action: 'move rss item',
					},
					{
						name: 'Refresh RSS item',
						value: 'refreshRssItem',
						description: 'Trigger a manual refresh of an RSS feed or folder',
						action: 'refresh rss item',
					},
					{
						name: 'Get RSS rules',
						value: 'getRssRules',
						description: 'Retrieve all RSS auto-download rules',
						action: 'get rss rules',
					},
					{
						name: 'Create or update RSS rule',
						value: 'createOrUpdateRssRule',
						description: 'Create a new rule or update an existing one',
						action: 'create or update rss rule',
					},
					{
						name: 'Reprocess RSS rules',
						value: 'reprocessRssRules',
						description: 'Trigger qBittorrent to reprocess all unread articles against rules',
						action: 'reprocess rss rules',
					},
					{
						name: 'Delete RSS rule',
						value: 'deleteRssRule',
						description: 'Delete an RSS auto-download rule',
						action: 'delete rss rule',
					},
					{
						name: 'Preview RSS rule matches',
						value: 'previewRssRuleMatches',
						description: 'Get articles that would match an RSS rule',
						action: 'preview rss rule matches',
					},
					{
						name: 'Rename RSS rule',
						value: 'renameRssRule',
						description: 'Rename an existing RSS auto-download rule',
						action: 'rename rss rule',
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
						name: 'Get log exclusions',
						value: 'getLogExclusions',
						description: 'Get the list of muted log message patterns',
						action: 'get log exclusions',
					},
					{
						name: 'Update log exclusions',
						value: 'updateLogExclusions',
						description: 'Replace the list of muted log message patterns',
						action: 'update log exclusions',
					},
					{
						name: 'Get log settings',
						value: 'getLogSettings',
						description: 'Get the current log configuration including level, file path, and rotation settings',
						action: 'get log settings',
					},
					{
						name: 'Update log settings',
						value: 'updateLogSettings',
						description: 'Update log configuration. Changes are applied immediately.',
						action: 'update log settings',
					},
					{
						name: 'Check for latest version',
						value: 'checkForLatestVersion',
						description: 'Check if a newer version of qui is available',
						action: 'check for latest version',
					},
					{
						name: 'Health check',
						value: 'healthCheck',
						description: 'Check if the API is healthy and responding',
						action: 'health check',
					},
					{
						name: 'Liveness probe',
						value: 'livenessProbe',
						description: 'Simple liveness check to confirm the service is running',
						action: 'liveness probe',
					},
					{
						name: 'Readiness probe',
						value: 'readinessProbe',
						description: 'Check if the service and its dependencies are ready to receive traffic',
						action: 'readiness probe',
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
						name: 'Delete tags',
						value: 'deleteTags',
						description: 'Delete one or more tags',
						action: 'delete tags',
					},
					{
						name: 'List tags',
						value: 'listTags',
						description: 'Get all tags',
						action: 'list tags',
					},
					{
						name: 'Create tags',
						value: 'createTags',
						description: 'Create new tags',
						action: 'create tags',
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
						name: 'Export torrent file',
						value: 'exportTorrentFile',
						description: 'Download the .torrent file for a specific torrent',
						action: 'export torrent file',
					},
					{
						name: 'Get torrent files',
						value: 'getTorrentFiles',
						description: 'Get list of files in a torrent',
						action: 'get torrent files',
					},
					{
						name: 'Update torrent file priorities',
						value: 'updateTorrentFilePriorities',
						description: 'Adjust the download priority (including do-not-download) for one or more files in a torrent.',
						action: 'update torrent file priorities',
					},
					{
						name: 'Get torrent peers',
						value: 'getTorrentPeers',
						description: 'Get list of peers for a torrent',
						action: 'get torrent peers',
					},
					{
						name: 'Get torrent piece states',
						value: 'getTorrentPieceStates',
						description: 'Get download state of each piece for a torrent.',
						action: 'get torrent piece states',
					},
					{
						name: 'Get torrent properties',
						value: 'getTorrentProperties',
						description: 'Get detailed properties of a torrent',
						action: 'get torrent properties',
					},
					{
						name: 'Rename torrent',
						value: 'renameTorrent',
						description: 'Update the display name for a torrent',
						action: 'rename torrent',
					},
					{
						name: 'Rename torrent file',
						value: 'renameTorrentFile',
						description: 'Rename a specific file within a torrent',
						action: 'rename torrent file',
					},
					{
						name: 'Rename torrent folder',
						value: 'renameTorrentFolder',
						description: 'Rename a folder within a torrent',
						action: 'rename torrent folder',
					},
					{
						name: 'Remove torrent trackers',
						value: 'removeTorrentTrackers',
						description: 'Remove trackers from a torrent',
						action: 'remove torrent trackers',
					},
					{
						name: 'Get torrent trackers',
						value: 'getTorrentTrackers',
						description: 'Get list of trackers for a torrent',
						action: 'get torrent trackers',
					},
					{
						name: 'Add torrent trackers',
						value: 'addTorrentTrackers',
						description: 'Add new trackers to a torrent',
						action: 'add torrent trackers',
					},
					{
						name: 'Edit torrent tracker',
						value: 'editTorrentTracker',
						description: 'Edit a tracker URL for a torrent',
						action: 'edit torrent tracker',
					},
					{
						name: 'Get torrent web seeds',
						value: 'getTorrentWebSeeds',
						description: 'Get list of web seeds (HTTP sources) for a torrent',
						action: 'get torrent web seeds',
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
						name: 'Create torrent',
						value: 'createTorrent',
						description: 'Create a new torrent file from a source path. Requires qBittorrent v5.0.0 or later.',
						action: 'create torrent',
					},
					{
						name: 'Get active torrent creation task count',
						value: 'getActiveTorrentCreationTaskCount',
						description: 'Get the number of active (running or queued) torrent creation tasks.',
						action: 'get active torrent creation task count',
					},
					{
						name: 'Get torrent creation status',
						value: 'getTorrentCreationStatus',
						description: 'Get status of torrent creation tasks. Query parameter taskID can be used to filter by specific task.',
						action: 'get torrent creation status',
					},
					{
						name: 'Delete torrent creation task',
						value: 'deleteTorrentCreationTask',
						description: 'Delete a torrent creation task',
						action: 'delete torrent creation task',
					},
					{
						name: 'Download created torrent file',
						value: 'downloadCreatedTorrentFile',
						description: 'Download the torrent file for a completed torrent creation task',
						action: 'download created torrent file',
					},
					{
						name: 'List torrents',
						value: 'listTorrents',
						description: 'Get paginated list of torrents',
						action: 'list torrents',
					},
					{
						name: 'Add torrent',
						value: 'addTorrent',
						description: 'Add a new torrent via file upload or magnet link',
						action: 'add torrent',
					},
					{
						name: 'Add peers to torrents',
						value: 'addPeersToTorrents',
						description: 'Add peers to one or more torrents',
						action: 'add peers to torrents',
					},
					{
						name: 'Ban peers permanently',
						value: 'banPeersPermanently',
						description: 'Ban peers from connecting to the client',
						action: 'ban peers permanently',
					},
					{
						name: 'Bulk torrent action',
						value: 'bulkTorrentAction',
						description: 'Perform bulk actions on multiple torrents',
						action: 'bulk torrent action',
					},
					{
						name: 'Check for duplicate torrents',
						value: 'checkForDuplicateTorrents',
						description: 'Determine whether any of the provided hashes already exist on the qBittorrent instance. Supports infohash v1 or v2 values.',
						action: 'check for duplicate torrents',
					},
					{
						name: 'List torrents across all instances',
						value: 'listTorrentsAcrossAllInstances',
						description: 'Get paginated list of torrents from all instances (primarily used for cross-seed filtering)',
						action: 'list torrents across all instances',
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
						name: 'List tracker icons',
						value: 'listTrackerIcons',
						description: 'Retrieve cached tracker favicons as data URLs keyed by tracker hostname',
						action: 'list tracker icons',
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
						name: 'List active trackers',
						value: 'listActiveTrackers',
						description: 'Get active tracker domains and representative tracker URLs for an instance',
						action: 'list active trackers',
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
				displayName: 'id',
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
				displayName: 'id',
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
				displayName: 'id',
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
				displayName: 'id',
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
				displayName: 'id',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['importBackupManifest'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['downloadBackupArchive'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Backup run ID',
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
				displayName: 'Archive format to download. Defaults to zip.',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['downloadTorrentFileFromBackup'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Backup run ID',
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
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['executeRestore'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Backup run ID',
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
				description: 'Automatically resume torrents once qBittorrent reports them as fully verified. Defaults to true when skip recheck is enabled.',
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
				description: 'When true, no changes are applied and the plan is returned.',
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
				description: 'Torrent hashes to exclude from the restore plan and execution.',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['backups'],
						operation: ['previewRestorePlan'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Backup run ID',
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
				description: 'Torrent hashes to exclude from the generated plan.',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['deleteCategories'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['listCategories'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['createCategory'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['categories'],
						operation: ['editCategory'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'Instance Id',
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
				displayName: 'id',
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
				displayName: 'API key (prefer X-API-Key header; query supported for autobrr).',
				name: 'apikey',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addACrossseedTorrentProvidedByAutobrr'],
					},
				},
				description: 'API key (prefer X-API-Key header; query supported for autobrr).',
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
				displayName: 'Instance Ids',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['getPerinstanceCompletionSettings'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceId',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updatePerinstanceCompletionSettings'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Categories',
				name: 'categories',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['updatePerinstanceCompletionSettings'],
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
						operation: ['updatePerinstanceCompletionSettings'],
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
						operation: ['updatePerinstanceCompletionSettings'],
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
						operation: ['updatePerinstanceCompletionSettings'],
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
						operation: ['updatePerinstanceCompletionSettings'],
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
				displayName: 'Maximum number of runs to return',
				name: 'limit',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['listCrossseedAutomationRuns'],
					},
				},
				description: 'Maximum number of runs to return',
			},
			{
				displayName: 'Offset for pagination',
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
				displayName: 'Indexer Ids',
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
				displayName: 'Instance Id',
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
				description: 'qBittorrent instance ID',
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
				displayName: 'Maximum number of runs to return',
				name: 'limit',
				type: 'number',
				default: 25,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['listSearchRunHistory'],
					},
				},
				description: 'Maximum number of runs to return',
			},
			{
				displayName: 'Number of runs to skip',
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
				displayName: 'Indexer Ids',
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
				displayName: 'Instance Id',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['analyzeTorrentForCrossseedSearch'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['addTorrentsFoundViaCrossseedSearch'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['getAsyncFilteringStatus'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['findLocalCrossseedMatches'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'When true, fail if file overlap checks cannot complete (use for delete dialogs to avoid false negatives)',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['searchCrossseedCandidatesForATorrent'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				default: 0,
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
				displayName: 'API key (prefer X-API-Key header; query supported for autobrr webhook).',
				name: 'apikey',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['checkIfAReleaseCanBeCrossseededAutobrrWebhook'],
					},
				},
				description: 'API key (prefer X-API-Key header; query supported for autobrr webhook).',
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
				displayName: 'Instance Ids',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['crossseed'],
						operation: ['getCrossseedStatusForInstance'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Arr Instance Id',
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
				displayName: 'Target Instance Id',
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
				displayName: 'Directory scan directory ID',
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
				displayName: 'Directory scan directory ID',
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
				displayName: 'Directory scan directory ID',
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
				displayName: 'Arr Instance Id',
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
				displayName: 'Target Instance Id',
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
				displayName: 'Directory scan directory ID',
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
				displayName: 'Filter files by status',
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
				displayName: 'Maximum number of items to return',
				name: 'limit',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanFiles'],
					},
				},
				description: 'Maximum number of items to return',
			},
			{
				displayName: 'Offset for pagination',
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
				displayName: 'Directory scan directory ID',
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
				displayName: 'Directory scan directory ID',
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
				displayName: 'Maximum number of runs to return',
				name: 'limit',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanRuns'],
					},
				},
				description: 'Maximum number of runs to return',
			},
			{
				displayName: 'Directory scan directory ID',
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
				displayName: 'Directory scan run ID',
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
				displayName: 'Maximum number of items to return',
				name: 'limit',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['dirScan'],
						operation: ['listDirectoryScanRunInjections'],
					},
				},
				description: 'Maximum number of items to return',
			},
			{
				displayName: 'Offset for pagination',
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
				displayName: 'Directory scan directory ID',
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
				displayName: 'Directory scan directory ID',
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
				displayName: 'Directory scan directory ID',
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
				displayName: 'id',
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
				displayName: 'id',
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
				displayName: 'Instance Ids',
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
				description: 'Instance IDs in the desired display order.',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['deleteInstance'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['updateInstance'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getAlternativeSpeedLimitsStatus'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['toggleAlternativeSpeedLimits'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getQbittorrentApplicationInfo'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getInstanceCapabilities'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getDirectoryContents'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'The directory path to list contents from',
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
				displayName: 'Include file/folder metadata in response',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getInstancePreferences'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['updateInstancePreferences'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getRecentTrackerReannounceActivity'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Optional maximum number of events to return.',
				name: 'limit',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getRecentTrackerReannounceActivity'],
					},
				},
				description: 'Optional maximum number of events to return.',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['getCurrentTrackerReannounceCandidates'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['updateInstanceStatus'],
					},
				},
				description: 'qBittorrent instance ID',
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
				description: 'Set to false to pause all automatic connections to the upstream qBittorrent instance.',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['instances'],
						operation: ['testConnection'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['listOrphanScanRuns'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Maximum number of runs to return',
				name: 'limit',
				type: 'number',
				default: 10,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['listOrphanScanRuns'],
					},
				},
				description: 'Maximum number of runs to return',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['cancelOrphanScanRun'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Scan run ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['getOrphanScanRun'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Scan run ID',
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
				displayName: 'Maximum number of files to return',
				name: 'limit',
				type: 'number',
				default: 100,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['getOrphanScanRun'],
					},
				},
				description: 'Maximum number of files to return',
			},
			{
				displayName: 'Offset for pagination',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['confirmOrphanFileDeletion'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Scan run ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['triggerOrphanScan'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['getOrphanScanSettings'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['orphanScan'],
						operation: ['updateOrphanScanSettings'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['markArticlesAsRead'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Article Id',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['addRssFeed'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['setFeedUrl'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['createRssFolder'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['removeRssItem'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['getRssItems'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Include article data with feeds',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['moveRssItem'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['refreshRssItem'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['getRssRules'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['createOrUpdateRssRule'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['reprocessRssRules'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['deleteRssRule'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Name of the rule to delete',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['previewRssRuleMatches'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Name of the rule to preview',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['rss'],
						operation: ['renameRssRule'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Current name of the rule',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['deleteTags'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['listTags'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['createTags'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['exportTorrentFile'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentFiles'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'Force refresh from qBittorrent instead of serving cached file metadata.',
				name: 'refresh',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentFiles'],
					},
				},
				description: 'Force refresh from qBittorrent instead of serving cached file metadata.',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['updateTorrentFilePriorities'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				description: 'File indices to update.',
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
				description: 'Desired priority value (0-7, where 0 marks files as do-not-download).',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentPeers'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentPieceStates'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentProperties'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrent'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFile'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['renameTorrentFolder'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['removeTorrentTrackers'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentTrackers'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['addTorrentTrackers'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['editTorrentTracker'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrentDetails'],
						operation: ['getTorrentWebSeeds'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Torrent hash',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['createTorrent'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['getActiveTorrentCreationTaskCount'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['getTorrentCreationStatus'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Optional task ID to filter by',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['deleteTorrentCreationTask'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Task ID to delete',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['downloadCreatedTorrentFile'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'Task ID of the completed torrent',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrents'],
					},
				},
				description: 'qBittorrent instance ID',
			},
			{
				displayName: 'page',
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
				displayName: 'limit',
				name: 'limit',
				type: 'number',
				default: 500,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrents'],
					},
				},
			},
			{
				displayName: 'sort',
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
				displayName: 'order',
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
				displayName: 'search',
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
				displayName: 'filters',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['addTorrent'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['addPeersToTorrents'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['banPeersPermanently'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['bulkTorrentAction'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['checkForDuplicateTorrents'],
					},
				},
				description: 'qBittorrent instance ID',
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
				displayName: 'page',
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
				displayName: 'limit',
				name: 'limit',
				type: 'number',
				default: 500,
				displayOptions: {
					show: {
						resource: ['torrents'],
						operation: ['listTorrentsAcrossAllInstances'],
					},
				},
			},
			{
				displayName: 'sort',
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
				displayName: 'order',
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
				displayName: 'search',
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
				displayName: 'filters',
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
				displayName: 'qBittorrent instance ID',
				name: 'instanceID',
				type: 'number',
				required: true,
				default: 0,
				displayOptions: {
					show: {
						resource: ['trackers'],
						operation: ['listActiveTrackers'],
					},
				},
				description: 'qBittorrent instance ID',
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

					} else if (operation === 'getPerinstanceCompletionSettings') {
						const instanceId = this.getNodeParameter('instanceId', i) as number;
						endpoint = 'cross-seed/completion/' + encodeURIComponent(instanceId);
						method = 'GET';

					} else if (operation === 'updatePerinstanceCompletionSettings') {
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
