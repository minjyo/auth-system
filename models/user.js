const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING(),
                    allowNull: false,
                },
                role: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                intro: {
                    type: Sequelize.STRING(),
                    allowNull: true,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    static associate(db) {}
};
