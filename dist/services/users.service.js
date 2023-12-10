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
exports.deleteUserByPk = exports.updateUser = exports.selectAllUsers = exports.insertUser = exports.selectUserByUsername = exports.selectUserByPk = void 0;
const users_query_1 = __importDefault(require("../queries/users.query"));
const database_1 = __importDefault(require("../config/database"));
const selectUserByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = users_query_1.default.select.by.pk;
    const users = yield database_1.default.query(sentence, [id]);
    if (!users.rows[0])
        return;
    return {
        id: users.rows[0].user_id,
        username: users.rows[0].username,
        firstName: users.rows[0].first_name,
        lastName: users.rows[0].last_name,
        password: users.rows[0].pass,
        isCritic: users.rows[0].is_critic
    };
});
exports.selectUserByPk = selectUserByPk;
const selectUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = users_query_1.default.select.by.username;
    const users = yield database_1.default.query(sentence, [username]);
    if (!users.rows[0])
        return;
    return {
        id: users.rows[0].user_id,
        username: users.rows[0].username,
        firstName: users.rows[0].first_name,
        lastName: users.rows[0].last_name,
        password: users.rows[0].pass,
        isCritic: users.rows[0].is_critic
    };
});
exports.selectUserByUsername = selectUserByUsername;
const insertUser = (entry) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = users_query_1.default.insert;
    const args = [entry.username, entry.firstName, entry.lastName, entry.password, entry.isCritic];
    const users = yield database_1.default.query(sentence, args);
    return {
        id: users.rows[0].user_id,
        username: users.rows[0].username,
        firstName: users.rows[0].first_name,
        lastName: users.rows[0].last_name,
        password: users.rows[0].pass,
        isCritic: users.rows[0].is_critic
    };
});
exports.insertUser = insertUser;
const selectAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = users_query_1.default.select.any;
    const users = yield database_1.default.query(sentence, []);
    const response = [];
    users.rows.map(user => {
        response.push({
            id: user.user_id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            password: user.pass,
            isCritic: user.is_critic
        });
    });
    return response;
});
exports.selectAllUsers = selectAllUsers;
const updateUser = (id, entry) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password } = users_query_1.default.update;
    if (entry.firstName)
        yield database_1.default.query(firstName, [entry.firstName, id]);
    if (entry.lastName)
        yield database_1.default.query(lastName, [entry.lastName, id]);
    if (entry.password)
        yield database_1.default.query(password, [entry.password, id]);
    return yield (0, exports.selectUserByPk)(id);
});
exports.updateUser = updateUser;
const deleteUserByPk = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = users_query_1.default.delete;
    yield database_1.default.query(sentence, [id]);
});
exports.deleteUserByPk = deleteUserByPk;
