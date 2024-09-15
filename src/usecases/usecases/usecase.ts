export interface Usecase<InputDto, OutputDto> {
  execute(
    input: InputDto,
    output: OutputDto,
  ): Promise<OutputDto>;
} ;