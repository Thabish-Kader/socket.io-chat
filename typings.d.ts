export interface ServerToClientEvents {
	getMsg: (message: string) => void;
}

export interface ClientToServerEvents {
	clientMsg: (data: { msg: string; room: string }) => void;
}
