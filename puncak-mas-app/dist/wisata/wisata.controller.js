"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WisataController = void 0;
const common_1 = require("@nestjs/common");
const create_wisata_dto_1 = require("./dto/create-wisata.dto");
let WisataController = class WisataController {
    findAll(nama) {
        return [
            {
                id: 1,
                nama: "Puncak Mas",
                lokasi: "Lampung",
                pengunjung: 120
            },
            {
                id: 2,
                nama: "Puncak Mas 2",
                lokasi: "Lampung",
                pengunjung: 80
            }
        ];
    }
    findOne(id) {
        return {
            id,
            nama: "Puncak Mas",
            lokasi: "Lampung",
            pengunjung: 120
        };
    }
    create(createWisataDto) {
        return create_wisata_dto_1.CreateWisataDto;
    }
};
exports.WisataController = WisataController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('nama')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WisataController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WisataController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wisata_dto_1.CreateWisataDto]),
    __metadata("design:returntype", void 0)
], WisataController.prototype, "create", null);
exports.WisataController = WisataController = __decorate([
    (0, common_1.Controller)('wisata')
], WisataController);
//# sourceMappingURL=wisata.controller.js.map