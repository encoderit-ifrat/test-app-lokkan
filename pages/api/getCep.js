import axios from 'axios';

export default async function handler(req, res) {
    const { cep } = req.query;

    if (!cep) {
        return res.status(400).json({ error: 'CEP is required' });
    }

    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            return res.status(404).json({ error: 'Invalid CEP' });
        }
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ error: 'Could not fetch address' });
    }
}