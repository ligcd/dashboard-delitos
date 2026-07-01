import { getComparisonNarrative } from "../../../services/comparison/comparisonNarrative";

export default function ComparisonSummary({

    comparison = []

}) {

    const narrative = getComparisonNarrative(comparison);

    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4">

                <h2 className="text-xl font-bold text-[#032236]">

                    📊 {narrative.title}

                </h2>

                <p className="mt-2 text-sm text-slate-500">

                    {narrative.summary}

                </p>

            </div>

            <div className="space-y-3">

                {

                    narrative.highlights.map((text, index) => (

                        <div

                            key={index}

                            className="flex items-start gap-3 rounded-lg bg-slate-50 p-3"

                        >

                            <span className="text-[#E47021]">

                                ✔

                            </span>

                            <span className="text-sm text-slate-700">

                                {text}

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}