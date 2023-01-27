export class MyArrays {
    static deleteElement(arr: number[], element: number): boolean {
        const index = arr.indexOf(element);
        if (index == -1) {
            return false;
        }
        arr.splice(index, 1);
        return true;
    }
}