import { tablet } from './window-size';

export const letters = 'AABBCCDDEEFFGGHHIIJJKKLLMMNNOO';

export const cardsSettings = {
	easy: {
		number: 8,
		width: tablet ? 2 : 4,
		height: tablet ? 4 : 2,
	},
	medium: {
		number: 16,
		width: 4,
		height: 4
	},
	hard: {
		number: 30,
		width: tablet ? 5 : 6,
		height: tablet ? 6 : 5
	}
};

export const change =  {
	element(elem, text) {
		this.elem = elem;
		this.elem.textContent = text;
		return this;
	},
	add(className) {
		this.elem.classList.add(className);
		return this;
	},

	remove(className) {
		this.elem.classList.remove(className);
		return this;
	}
};