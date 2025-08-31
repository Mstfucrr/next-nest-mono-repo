import { PaginationOutput } from '@dailyshop/shared-types'

/** Prisma delegate imzası (courier, product vs.) */
type Delegate<T, DefaultArgs extends object, Where extends object, OrderBy extends object> = {
  findMany(
    args: {
      skip?: number
      take?: number
      where?: Where
      orderBy?: OrderBy | OrderBy[]
    } & DefaultArgs
  ): Promise<T[]>
  count(args: { where?: Where }): Promise<number>
}

export async function paginatePrisma<T, DefaultArgs extends object, Where extends object, OrderBy extends object>(
  repo: Delegate<T, DefaultArgs, Where, OrderBy>,
  args: { where?: Where; orderBy?: OrderBy; skip?: number; take?: number; defaultArgs?: DefaultArgs }
): Promise<PaginationOutput<T>> {
  const { defaultArgs, ...queryArgs } = args

  const [rows, total] = await Promise.all([
    repo.findMany({
      ...queryArgs,
      ...(defaultArgs || {})
    } as { skip?: number; take?: number; where?: Where; orderBy?: OrderBy } & DefaultArgs),
    repo.count({ where: args.where })
  ])

  return {
    rows,
    total
  }
}
