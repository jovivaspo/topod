
const units = {
    day:86400,
    hour:3600,
    minute:60,
    second:1
}

const getSecondDiff = datestamp => (Date.now() - Date.parse(datestamp)) / 1000

const getUnitAndValueDate = (secondsElapsed) =>{
    const entries = Object.entries(units)
    for(const[unit, secondsInUnit] of entries){
        const match = secondsElapsed >= secondsInUnit || unit === 'second'

        if(match){
           
            const value = Math.floor(secondsElapsed/secondsInUnit) * -1
            
            return {value,unit}
        }
    }
}

export const timeAgo = (timestamp, locale) =>{

    const rtf = new Intl.RelativeTimeFormat(locale)

    const secondsElapsed = getSecondDiff(timestamp)

    const {value, unit} = getUnitAndValueDate(secondsElapsed)

    return rtf.format(value,unit)
}
