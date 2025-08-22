import { PaginationOutput } from '@dailyshop/shared-types'

/** Prisma delegate imzası (courier, product vs.) */
type Delegate<T, Where extends object, OrderBy extends object> = {
  findMany(args: { skip?: number; take?: number; where?: Where; orderBy?: OrderBy | OrderBy[] }): Promise<T[]>
  count(args: { where?: Where }): Promise<number>
}

export async function paginatePrisma<T, Where extends object, OrderBy extends object>(
  repo: Delegate<T, Where, OrderBy>,
  args: { where?: Where; orderBy?: OrderBy; skip?: number; take?: number }
): Promise<PaginationOutput<T>> {
  const [rows, total] = await Promise.all([
    repo.findMany(args as { skip?: number; take?: number; where?: Where; orderBy?: OrderBy }),
    repo.count({ where: args.where } as { where?: Where })
  ])

  return {
    rows,
    total
  }
}
