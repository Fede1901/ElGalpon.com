import { MigrationInterface, QueryRunner } from "typeorm";

export class ColumnaDNI1699604831546 implements MigrationInterface {
    name = 'ColumnaDNI1699604831546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchase\` DROP FOREIGN KEY \`FK_2248a331258d17d204ccfe9497c\``);
        await queryRunner.query(`ALTER TABLE \`purchase\` CHANGE \`customer_id\` \`user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`dni\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('CUSTOMER', 'ADMIN') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase\` ADD CONSTRAINT \`FK_c4f9e58ae516d88361b37ed9532\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchase\` DROP FOREIGN KEY \`FK_c4f9e58ae516d88361b37ed9532\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('USER', 'CUSTOMER', 'ADMIN') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`dni\``);
        await queryRunner.query(`ALTER TABLE \`purchase\` CHANGE \`user_id\` \`customer_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase\` ADD CONSTRAINT \`FK_2248a331258d17d204ccfe9497c\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
