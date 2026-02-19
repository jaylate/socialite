export class ApiError extends Error {
  constructor(
    public status: number,
    public text: string
  ) {
    super(text);
    this.name = 'ApiError';
  }
}
