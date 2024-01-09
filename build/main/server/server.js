"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const fastify_1 = __importDefault(require("fastify"));
const socket_io_1 = require("socket.io");
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const app = (0, fastify_1.default)();
const io = new socket_io_1.Server(app.server, {
    adapter: (0, fastify_socket_io_1.default)(app),
});
// Store shared streams with their channel IDs
const streams = {};
// Generate unique channel IDs
function generateChannelId() {
    // Implement your preferred method for generating unique IDs, such as uuidv4
}
// ==== Electron-specific routes and events ====
// Handle incoming screen-sharing streams from the Electron app
app.post('/share-screen', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stream = req.body.stream;
    const channelId = generateChannelId();
    streams[channelId] = stream;
    // Broadcast to all connected clients (Electron and web app)
    io.emit('screen-sharing-started', channelId);
    res.send({ channelId });
}));
// ==== Web app-specific routes ====
// Handle joining a channel from the web app
app.get('/join/:channelId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const channelId = req.params.channelId;
    if (!streams[channelId]) {
        return res.status(404).send('Channel not found');
    }
    res.send({ stream: streams[channelId] });
}));
// ==== Socket.io connection and event handling ====
io.on('connection', (socket) => {
    console.log('Client connected');
    // Handle events for joining and leaving channels, screen sharing, and other interactions
    // specific to Electron or web app clients
});
// ==== Server start ====
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen(3000, (err, address) => {
            if (err)
                throw err;
            console.log(socket_io_1.Server, listening, on, $, { address });
        });
    }
    catch (error) {
        console.error('Server start error:', error);
    }
});
exports.startServer = startServer;
