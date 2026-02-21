# n8n-nodes-qui

This is an n8n community node. It lets you use **QUI** in your n8n workflows.

QUI is a web UI and API for managing multiple [qBittorrent](https://www.qbittorrent.org/) instances from a single interface. It provides cross-seeding, ARR integrations (Sonarr/Radarr), RSS automation, directory scanning, orphan detection, backup/restore, and more.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### API Keys

- **List API Keys** – Get all API keys for the current user
- **Create API Key** – Generate a new API key
- **Delete API Key** – Revoke an API key

### ARR Integrations

- **List ARR Instances** – Get all configured Sonarr/Radarr instances
- **Get ARR Instance** – Get a single Sonarr/Radarr instance by ID
- **Create ARR Instance** – Add a new Sonarr or Radarr instance
- **Update ARR Instance** – Update an existing Sonarr/Radarr instance
- **Delete ARR Instance** – Delete an ARR instance configuration
- **Test ARR Instance** – Test connectivity to an existing ARR instance
- **Test ARR Connection** – Test connectivity before saving
- **Resolve Title to External IDs** – Resolve a title to IMDb, TMDb, TVDb, TVMaze IDs

### Authentication

- **Check Setup Status** – Check if initial setup is required
- **Initial Setup** – Create the initial admin user
- **Login** – Authenticate with username and password
- **Logout** – End the current session
- **Get Current User** – Get information about the authenticated user
- **Change Password** – Change the current user's password

### Backups

- **Import Backup Manifest** – Import a backup manifest file
- **Download Backup Archive** – Download the backup archive for a backup run
- **Download Torrent File From Backup** – Download a specific torrent file from a backup
- **Preview Restore Plan** – Build a restore plan without applying changes
- **Execute Restore** – Execute the restore plan for a backup run

### Categories

- **List Categories** – Get all categories
- **Create Category** – Create a new category
- **Edit Category** – Edit an existing category
- **Delete Categories** – Delete one or more categories

### Client API Keys

- **List Client API Keys** – Get all client API keys for external applications
- **Create Client API Key** – Generate a new client API key
- **Delete Client API Key** – Revoke a client API key

### Cross-Seed

- **Add a Cross-Seed Torrent (autobrr)** – Accept a torrent from autobrr and add it where a complete match exists
- **Check if a Release Can Be Cross-Seeded (autobrr Webhook)** – Check if matching torrents exist across instances
- **Analyze Torrent for Cross-Seed Search** – Analyze a torrent for cross-seed searching
- **Search Cross-Seed Candidates for a Torrent** – Query Torznab indexers for matching releases
- **Add Torrents Found via Cross-Seed Search** – Download and queue cross-seed results
- **Get Async Filtering Status** – Get async filtering progress for a torrent
- **Find Local Cross-Seed Matches** – Find matching torrents across all qBittorrent instances
- **Get Cross-Seed Status for Instance** – Get cross-seed stats for a specific instance
- **Get Cross-Seed Automation Settings** – Retrieve automation configuration
- **Update Cross-Seed Automation Settings** – Persist new automation schedule and preferences
- **Patch Cross-Seed Automation Settings** – Partially update automation settings
- **Get Cross-Seed Automation Status** – Get scheduler state and next run info
- **Trigger Cross-Seed Automation Run** – Start an on-demand automation pass
- **List Cross-Seed Automation Runs** – Return the most recent automation runs
- **Start a Cross-Seed Search Run** – Start a search automation run for an instance
- **Cancel Running Search** – Cancel the currently running cross-seed search
- **Get Search Run Status** – Get the current status of a search automation
- **List Search Run History** – Get history of cross-seed search runs for an instance
- **Get Seeded Torrent Search Settings** – Get persisted defaults for search runs
- **Update Seeded Torrent Search Settings** – Update search run defaults
- **Get per-Instance Completion Settings** – Get cross-seed completion settings for an instance
- **Update per-Instance Completion Settings** – Update cross-seed completion settings for an instance
- **Cancel RSS Automation Run** – Stop the currently running RSS automation run

### Dir Scan

- **List Scan Directories** – Get all configured scan directories
- **Create Scan Directory** – Create a new scan directory configuration
- **Get Scan Directory** – Get a scan directory by ID
- **Update Scan Directory** – Partially update a scan directory configuration
- **Delete Scan Directory** – Delete a scan directory and its history
- **Trigger a Directory Scan** – Start a manual scan run
- **Cancel a Directory Scan** – Cancel the currently running scan
- **Get Directory Scan Status** – Get the status of the active or most recent scan
- **List Directory Scan Files** – Get tracked files with optional status filtering
- **Reset Directory Scan Progress** – Reset file state so the next scan re-processes all files
- **List Directory Scan Runs** – Get recent scan runs for a directory
- **List Directory Scan Run Injections** – Get injection attempts for a scan run
- **Get Dir Scan Settings** – Get global directory scanner configuration
- **Update Dir Scan Settings** – Partially update global directory scanner settings

### External Programs

- **List External Programs** – Get all configured external programs
- **Create External Program** – Add a new external program configuration
- **Update External Program** – Update an external program configuration
- **Delete External Program** – Delete an external program configuration
- **Execute External Program** – Execute an external program for one or more torrents

### Instances

- **List Instances** – Get all configured qBittorrent instances
- **Add Instance** – Add a new qBittorrent instance
- **Reorder Instances** – Update the display order of all instances
- **Delete Instance** – Remove a qBittorrent instance

### Licenses

- **List Licenses** – Get all configured licenses

### Orphan Scan

- **List Orphan Scan Results** – Get results from orphan scans

### RSS

- **List RSS Feeds** – Get all configured RSS feeds
- **Create RSS Feed** – Add a new RSS feed
- **Get RSS Feed** – Get a specific RSS feed by ID
- **Update RSS Feed** – Update an RSS feed configuration
- **Delete RSS Feed** – Delete an RSS feed

### System

- **Get System Info** – Get system information and status

### Tags

- **List Tags** – Get all tags
- **Create Tags** – Create one or more new tags
- **Delete Tags** – Delete one or more tags

### Torrent Details

- **Get Torrent Details** – Get detailed information about a specific torrent

### Torrents

- **List Torrents** – Get all torrents across instances
- **Add Torrent** – Add a new torrent
- **Delete Torrents** – Delete one or more torrents
- **Pause Torrents** – Pause one or more torrents
- **Resume Torrents** – Resume one or more torrents
- **Move Torrents** – Move torrents between instances

### Tracker Icons

- **Get Tracker Icon** – Get the icon for a tracker

### Trackers

- **List Trackers** – Get all trackers across instances

## Credentials

To authenticate with QUI you need:

1. **Base URL** – The URL of your QUI instance (e.g. `https://qui.example.tld`). Do not include a trailing slash or `/api/`.
2. **API Key** – A 64-character lowercase hexadecimal API key.

To obtain an API key:

- Log in to your QUI instance.
- Navigate to **Settings → API Keys** (or use the API Keys resource in this node to create one programmatically).
- Copy the generated key and paste it into the credential.

The key is sent as the `X-API-Key` header on every request.

## Compatibility

Tested against n8n version **2.8+**. It should be compatible with **1.x** as well but is untested.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [QUI GitHub repository](https://github.com/autobrr/qui)
- [n8n-nodes-qui GitHub repository](https://github.com/LilTrublMakr/n8n-nodes-qui)
