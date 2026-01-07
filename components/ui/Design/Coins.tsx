import Image from "next/image"

type Props = {
    text : string
}


const Coins = ({ text } : Props) => {
  return (
    <div className="flex items-center gap-2 bg-[#111] border border-gray-200/10 px-4 py-2 rounded">
        <Image
            src={"/assets/ui/coin.svg"}
            width={32}
            height={32}
            alt="User credits display"
        />
        <p className="text-2xl">{text}</p>
    </div>
  )
}
export default Coins