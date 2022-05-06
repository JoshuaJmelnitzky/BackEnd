const fs = require('fs/promises');
const path = require('path');

class Chat {
	constructor(filename) {
		this.filename = filename;
	}

	async createMessages() {
		let file;
		try {
			file = await fs.readFile(this.filename, 'utf-8');
			return JSON.parse(file);
		} catch (error) {
			if (error.code == 'ENOENT') {
				await fs.writeFile(this.filename, '[]');
				
				file = await fs.readFile(this.filename, 'utf-8');
			} else {
				console.log(error);
			}
		}
		return JSON.parse(file);
	}

	async save(newData) {
		let file = await this.createMessages();
		if (Array.isArray(newData)) {
			try {
				const data = JSON.parse(file);
				await fs.writeFile(path.join(__dirname, this.filename), JSON.stringify(data, null, 2));
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const data = await this.createMessages();
				data.push(newData);
				await fs.writeFile(path.join(__dirname, this.filename), JSON.stringify(data, null, 2));
			} catch (err) {
				console.log(err);
			}
		}
	}
	async getAll() {
		try {
			const data = await this.createMessages();
			return data;
		} catch (err) {
			console.log(err);
		}
	}

	
}

module.exports = Chat;
