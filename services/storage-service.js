export class StorageService {
  getRepairsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('repairList')) ?? [];
  }

  findRepairById(id) {
    const repairList = this.getRepairsFromLocalStorage();
    return repairList.find((repair) => repair.id === id);
  }

  setRepairInLocalStorage(repair) {
    const repairList = this.getRepairsFromLocalStorage() ?? [];
    repairList.push(repair);
    localStorage.setItem('repairList', JSON.stringify(repairList));
  }

  saveRepairsInLocalStorage(repairList) {
    localStorage.setItem('repairList', JSON.stringify(repairList));
  }

  deleteRepairInLocalStorage(repairToDelete) {
    const repairList = this.getRepairsFromLocalStorage();
    const newRepairList = repairList.filter((repair) => repair.id !== repairToDelete.id);
    this.saveRepairsInLocalStorage(newRepairList);
  }

  replaceRepair(newRepair) {
    const repairList = this.getRepairsFromLocalStorage();
    const newRepairList = repairList.filter((repair) => repair.id !== newRepair.id);
    newRepairList.push(newRepair);
    this.saveRepairsInLocalStorage(newRepairList);
  }
}
