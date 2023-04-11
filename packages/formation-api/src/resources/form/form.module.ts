import { Module } from "@nestjs/common";
import { FormService } from "./form.service";
import { FormResolver } from "./form.resolver";
import { PrismaService } from "../../../prisma/prisma.service";

@Module({
	providers: [PrismaService, FormResolver, FormService],
	exports: [FormResolver, FormService],
})
export class FormModule {}
