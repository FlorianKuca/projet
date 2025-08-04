import { User } from '../models/user.model.js';
import '../models/index.js';
export default {
    async getAll(_req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    },
    async getById(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: req.query.include ?? []
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    },
    async create(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: 'Error creating user', error });
        }
    },
    async update(req, res) {
        try {
            const [updatedCount, updateRows] = await User.update(req.body, {
                where: { id: req.params.id },
                returning: true,
            });
            if (!updatedCount) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updateRows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    },
    async delete(req, res) {
        try {
            const user = await User.destroy({ where: { id: req.params.id } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}