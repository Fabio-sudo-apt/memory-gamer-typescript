import './style.css'

export interface CardPrors{
    id: string,
    flipped?: boolean,
    back: string,
    handleClick?: (id: string) => void
}

export function Card( { flipped= false, back, id, handleClick}: CardPrors ){
    const cardContentClassNames = ['card_content']
    flipped && cardContentClassNames.push('card_content_flipped')

    const handleClickFn = (id: string) => {
        if(handleClick){
            handleClick(id)
        }
    }
    return(
        <div className="card" onClick={() => handleClickFn(id)}>
            <div className={cardContentClassNames.join(' ')}>
                <div className="card_face card_face--front">?</div>
                <div className="card_face card_face--back">{back}</div>
            </div>
        </div>
    );
}