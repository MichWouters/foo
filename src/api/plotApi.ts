import {
    persistToDatabase,
    retrieveFromDatabase
} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/databaseSimulation.ts'
import {PLOTS_KEY} from './NIET_OPENEN_WORDT_GEBRUIKT_DOOR_DE_API_FILES/generateData.ts'
import {QueryKey, useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'
import {IPlot} from '../models/IPlot'
import {faker} from '@faker-js/faker'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */


export const useGetAllPlots = (): UseQueryResult<IPlot[], Error> => {
    return useQuery({
        queryKey: ['plots'],
        queryFn: getAllPlots,
    })
}

export const useGetPlotById = (id: string): UseQueryResult<IPlot, Error> => {
    return useQuery({
        queryKey: ['plots', id],
        queryFn: () => getPlotById(id),
    })
}

interface UseAddActorToMovieContext {
    queryKey: QueryKey
    oldData?: IPlot[]
}

export const useCreatePlot = (): UseMutationResult<IPlot, Error, AddPlotProps, UseAddActorToMovieContext> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createPlot,
        onMutate: ({plot}) => {
            const queryKey = ['plots']
            plot.id = faker.string.uuid()
            const oldData = queryClient.getQueryData<IPlot[]>(queryKey)
            const newData = [plot, ...oldData ?? []]
            queryClient.setQueryData(queryKey, newData)
            return {queryKey, oldData}
        },

        onSettled: async () => {
            await queryClient.invalidateQueries(['plots'])
        },
    })
}

export const useDeletePlot = (): UseMutationResult<void, Error, DeletePlotProps, void> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deletePlot,
        onSettled: async () => {
            await queryClient.invalidateQueries(['plots'])
        }
    })
}

//endregion


//region API functions


/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

/**
 * Retrieve all plots in the database.
 */
async function getAllPlots(): Promise<IPlot[]> {
    return retrieveFromDatabase<IPlot[]>(PLOTS_KEY)
}

/**
 * Retrieve a specific plot using its id.
 *
 * @param id The id of the movie.
 */
async function getPlotById(id: string): Promise<IPlot | undefined> {
    return (await retrieveFromDatabase<IPlot[]>(PLOTS_KEY)).find(m => m.id === id)
}

interface AddPlotProps {
    plot: IPlot
}

/**
 * Add a new plot to the database.
 *
 * @param The plot that should be added to the database, can optionally include the id of the new plot.
 * @return The newly created plot.
 */
async function createPlot({plot}: AddPlotProps): Promise<IPlot> {
    if (!plot.id) {
        plot.id = faker.string.uuid()
    }
    const plots = await retrieveFromDatabase<IPlot[]>(PLOTS_KEY)
    await persistToDatabase(PLOTS_KEY, [plot, ...plots])
    return plot
}

interface DeletePlotProps {
    id: string
}

/**
 * Delete a plot from the database.
 *
 * @param id The id of the plot that must be deleted.
 * @return
 */
async function deletePlot({id}: DeletePlotProps): Promise<void> {
    const plots = await retrieveFromDatabase<IPlot[]>(PLOTS_KEY)
    await persistToDatabase(PLOTS_KEY, plots.filter(p => p.id !== id))
}

//endregion
