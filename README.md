# Mr. Robot 🤖

Mr. Robot is a project developed 3 years ago with the goal of creating a bot for automated advertising delivery via WhatsApp. Using [Venom Bot](https://github.com/orkestral/venom) as a provider, the project significantly reduces costs and message limitations, making mass messaging more efficient and accessible.

---

## Features ✨

- 🚀 Automated sending of advertising messages via WhatsApp (individual and campaign)
- 📥 CSV import of contacts for bulk messaging
- 📊 Campaign management (grouping contacts)
- 🧑‍💼 Human fallback: escalate to a human when requested
- 🖼️ File/image sending support
- ✅ Contact opt-in/opt-out management
- 🔗 Simple REST API for integration
- 🔄 Error handling and retry queue for failed deliveries
- 📝 Logging with colored output for better debugging

---

## Architecture 🏗️

- **Backend:** Node.js with Express
- **WhatsApp Integration:** [Venom Bot](https://github.com/orkestral/venom)
- **Database:** SQLite (see [`SqliteDB`](src/providers/database.ts))
- **Queue:** [fastq](https://www.npmjs.com/package/fastq) for message and contact processing
- **File Uploads:** [Multer](https://www.npmjs.com/package/multer) for handling images/files
- **Validation:** [Yup](https://www.npmjs.com/package/yup) for DTO validation

### Main Folders 📁

- [`src/app`](src/app) - Application entrypoint and route definitions
- [`src/controllers`](src/controllers) - HTTP controllers for each resource
- [`src/services`](src/services) - Business logic and WhatsApp integration
- [`src/repositories`](src/repositories) - Database access layer
- [`src/models`](src/models) - TypeScript models and contracts
- [`src/dto`](src/dto) - Data transfer objects and validation
- [`src/events`](src/events) - WhatsApp event handlers and bot logic
- [`src/helpers`](src/helpers) - Utility functions and queue workers
- [`src/utils`](src/utils) - Logger, database normalization, etc.

---

## Storage 💾

- **Database:** SQLite file (`messenger.db` by default)
  - **Tables:** `campaign`, `people`
  - Each person is linked to a campaign for targeted messaging
- **Files:** Uploaded images/files are stored in `tmp/img/`
- **CSV Import:** Contacts can be imported from CSV files (see `tmp/phones.csv`)

---

## REST API Endpoints 🌐

All endpoints are defined in [`src/app/routes.ts`](src/app/routes.ts).

### Health Check 🩺

- `GET /health`
  - Returns `"Ok"` if the server is running.

### Campaigns 📊

- `GET /list`
  - Lists all campaigns.

### People 👥

- `POST /people`

  - **Body:** `{ file: string, name?: string }`
  - Imports contacts from a CSV file and creates a new campaign.

- `POST /human`
  - **Body:** `{ humansToCreate: [{ name: string, phone: string }] }`
  - Adds human contacts for fallback support.

### Messaging 💬

- `POST /send`

  - **Form Data:** `file` (optional image), plus JSON fields:
    - `{ id: number, phone: string, msg: string, fileMsg?: string }`
  - Sends a message (and optional image) to a single contact.

- `POST /send-to-campaign`
  - **Form Data:** `file` (optional image), plus JSON fields:
    - `{ id: number, msg: string, fileMsg?: string }`
  - Sends a message (and optional image) to all contacts in a campaign.

---

## How to Use 🛠️

1. Clone this repository:
   ```bash
   git clone https://github.com/jarssin/mr.robot.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Start the server:
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

---

## Notes ⚠️

- This project is for educational purposes and should be used in accordance with WhatsApp policies.
- Improper use may result in account blocking.
- The first run will auto-create the SQLite database if it does not exist.

---

## License 📄

This project is licensed under the MIT license.
