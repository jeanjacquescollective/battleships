import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket;

  constructor(url: string) {
    this.socket = io(url, { transports: ["websocket", "polling"] });
    this.initializeSocketListeners();
  }

  private initializeSocketListeners(): void {
    this.socket.on("connect", () => {
      console.log("Connected to the server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    this.socket.on("receiveMessage", (message: string) => {
      console.log("Message received:", message);
    });
  }
  sendMessage(channel: string, message: string): void {
    console.log('message send')
    this.socket.emit(channel, message);
  }
}

export default SocketService;
