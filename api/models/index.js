import { User } from './user.model.js';
import { Site }  from './site.model.js';
import { Note } from './note.model.js';
import { Tag } from './tag.model.js';
import  sequelize  from './sequelize.client.js';


Note.belongsToMany(Tag, {
    through: 'note_tags',
    foreignKey: 'noteId',
});
Tag.belongsToMany(Note, {
    through: 'note_tags',
    foreignKey: 'tagId',
});

// Export models
export { User, Site, Note, Tag, sequelize };