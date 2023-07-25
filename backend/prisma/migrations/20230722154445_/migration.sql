-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orderServices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idCliente" TEXT NOT NULL,
    "idService" TEXT NOT NULL,
    "idTechnicion" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "date" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "numOs" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "received" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "orderServices_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orderServices_idService_fkey" FOREIGN KEY ("idService") REFERENCES "services" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orderServices_idTechnicion_fkey" FOREIGN KEY ("idTechnicion") REFERENCES "tecnicos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orderServices" ("created_at", "date", "id", "idCliente", "idService", "idTechnicion", "numOs", "obs", "plate", "status", "updated_at") SELECT "created_at", "date", "id", "idCliente", "idService", "idTechnicion", "numOs", "obs", "plate", "status", "updated_at" FROM "orderServices";
DROP TABLE "orderServices";
ALTER TABLE "new_orderServices" RENAME TO "orderServices";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
