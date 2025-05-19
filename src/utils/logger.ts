import dayjs from 'dayjs';

const getTime = (): string => {
	return dayjs().format('HH:mm:ss DD/MM/YYYY');
};

export class Logger {
	static info(message: string) {
		const log = `[${getTime()}][INFO] ${message}`;
		console.log(`%c ${log}`, 'color: #5D9C59');
	}

	static debug(message: string, content: string | object) {
		if (typeof content === 'object') {
			content = JSON.stringify(content);
		}

		const log = `[${getTime()}][DEBUG] ${message} ${content}`;
		console.log(`%c ${log}`, 'color: #2F58CD');
	}

	static error(message: string, content: string | object) {
		if (typeof content === 'object') {
			content = JSON.stringify(content);
		}

		const log = `[${getTime()}][ERROR] ${message} ${content}`;
		console.log(`%c ${log}`, 'color: #EB455F');
	}

	static warn(message: string, content: string | object) {
		if (typeof content === 'object') {
			content = JSON.stringify(content);
		}

		const log = `[${getTime()}][WARN] ${message} ${content}`;
		console.log(`%c ${log}`, 'color: #FF7F3F');
	}

	static table(content?: string[] | number[]) {
		console.table(content);
	}
}
