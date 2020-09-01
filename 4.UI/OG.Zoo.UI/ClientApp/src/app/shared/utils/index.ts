export default abstract class Utils {

    /**
     * Validate if a variable is null or undefined
     *
     * @export
     * @param value Variable to validate
     * @returns true if is null or undefined, otherwise, false.
     */
    public static isNullOrUndefined(value: any): boolean {
      return typeof(value) === 'undefined' || value === null;
  }

  /**
   * Validate if a variable is undefined
   *
   * @export
   * @param value Variable to validate
   * @returns true if is undefined, otherwise, false.
   */
  public static isUndefined(value: any): boolean {
      return typeof(value) === 'undefined';
  }
}
