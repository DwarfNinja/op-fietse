export class StorageService {
  getRepairList() {
    return JSON.parse(localStorage.getItem('repairList')) ?? [];
  }

  findRepairById(id) {
    const repairList = this.getRepairList();
    return repairList.find((repair) => repair.id === id);
  }

  addRepair(repair) {
    const repairList = this.getRepairList() ?? [];
    repairList.push(repair);
    localStorage.setItem('repairList', JSON.stringify(repairList));
  }

  replaceRepair(newRepair) {
    const repairList = this.getRepairList();
    const newRepairList = repairList.filter((repair) => repair.id !== newRepair.id);
    newRepairList.push(newRepair);
    this.saveRepairList(newRepairList);
  }

  saveRepairList(repairList) {
    localStorage.setItem('repairList', JSON.stringify(repairList));
  }

  deleteRepair(repairToDelete) {
    const repairList = this.getRepairList();
    const newRepairList = repairList.filter((repair) => repair.id !== repairToDelete.id);
    this.saveRepairList(newRepairList);
  }

  getTempRepair() {
    return JSON.parse(localStorage.getItem('tempRepair'));
  }

  saveTempRepair(repair) {
    localStorage.setItem('tempRepair', JSON.stringify(repair));
  }

  removeTempRepair() {
    localStorage.removeItem('tempRepair');
  }
}
