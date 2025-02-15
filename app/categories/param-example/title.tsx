import { queryParamCached } from "./type";

export default function ParamsExampleTitle() {

    // The cached data went to the parent component
    const dataCached = queryParamCached.all();

    // console.log("Nested server component", "\n", dataCached);

    return (
        <div className="space-y-2">
            <h1 className="text-2xl font-bold">Param Example</h1>
            <p className="text-sm text-gray-500">
                <span>This filters are stored with </span>
                <span className="font-bold">useQueryStates</span>
                <span>.</span>
            </p>
            <p className="text-sm text-gray-500">
                <span>A </span>
                <span className="font-bold">useState</span>
                <span> like hook that syncs with the </span>
                <span className="font-bold">URL params</span>
                <span>.</span>
            </p>
            <div className="text-sm text-gray-500">
                <p>Params values at the loading of the page: </p>
                <p className="font-bold">{JSON.stringify(dataCached, null, 2)}</p>
            </div>
        </div>
    );
}
