export const date = unixDate => new Date(parseInt(unixDate, 0))
                                  .toString()
                                  .slice(0, 24)
