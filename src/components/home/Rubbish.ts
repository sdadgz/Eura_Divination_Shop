import {HolyRelic} from "components/home/HolyRelic";

export class Rubbish {

    // 找绝对没用的垃圾
    static absolutelyRubbish(holyRelics: HolyRelic[]): HolyRelic[] {
        const losers = new Set<HolyRelic>();
        holyRelics.forEach(holyRelic => {
            losers.has(holyRelic) || holyRelics.forEach(hr => {
                HolyRelic.equals(hr, holyRelic) || !HolyRelic.getLoser(holyRelic, hr) || losers.add(hr);
            })
        })
        return [...losers];
    }
}