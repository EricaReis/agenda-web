import api from "../../../services/api";

export class AuthService {
    async login(email: string, password: string) {
        try {
            const response = await api.post('/login', { email, password });

            localStorage.setItem("token", response.data.data.token);
        } catch (error) {
            throw new Error('Usuário ou senha inválidos');
        }
    }

    async signOut() {
        localStorage.clear();
    }
}