export interface ContractPost {
	title: string;
	body: string;
	creator: string;
	blockNumber: number;
	_id: number;
	parent: number;
}
export const contractPostSerializer = (data: any): ContractPost => {
	if (data === undefined) {
		return {
			title: '',
			body: '',
			creator: '',
			blockNumber: 0,
			_id: 0,
			parent: 0,
		};
	} else {
		return {
			title: data[0],
			body: data[1],
			creator: data[2],
			blockNumber: data[3].toNumber(),
			_id: data[4].toNumber(),
			parent: data[5].toNumber(),
		};
	}
};

export interface ContractReplies {
	replies: ContractPost[];
}

export const contractGetRepliesSerializer = (data: any): ContractReplies => {
	if (data === undefined) {
		return { replies: [] };
	} else {
		return {
			replies: data.map((reply: ContractPost) => contractPostSerializer(reply)),
		};
	}
};

export const contractLockStatusSerializer = (data: any): boolean => {
	if (data === true) {
		return true;
	} else {
		return false;
	}
};
