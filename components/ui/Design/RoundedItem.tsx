

type ItemProps = {
    text : string
}

export default function RoundedItem({ text } : ItemProps) {

    return(
        <p className="text-sm text-gray-300 border-2 border-gray-200/30 px-4 py-2 rounded-full">{text}</p>
    )

}