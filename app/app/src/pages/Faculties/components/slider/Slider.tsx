import { useState } from 'react'
import { SliderArrow } from '../../../../icons/SliderArrow'
import { sliderArr } from './sliderArr'

export const Slider = () => {
	const [index, setIndex] = useState(0)

	const prev = () => {
		setIndex(index + 1)
		if (index == sliderArr.length - 1) {
			setIndex(0)
		}
	}

	const next = () => {
		setIndex(index - 1)
		if (index == 0) {
			setIndex(sliderArr.length - 1)
		}
	}

	return (
		<div className='h-full w-full flex items-center justify-center'>
			<div className=' h-[100%] w-full flex gap-10 flex-col justify-center items-center'>
				<img
					className={`aspect-[2.5/1] w-[100%] scale block `}
					src={sliderArr[index].img}
					alt=''
				/>
				<div className='flex gap-10 items-center justify-center'>
					<div
						className='cursor-pointer hover:opacity-80 active:opacity-50 transition-all'
						onClick={next}
					>
						<SliderArrow width={20} height={20} rotate={180} fill='#0F91D6' />
					</div>
					<div className='mx-10 flex gap-3 items-center'>
						{sliderArr.map((_, ind) => (
							<div
								style={{
									background: ind == index ? '#0F91D6' : '#00000015',
									width: ind == index ? '30px' : '10px',
									height: ind == index ? '15px' : '10px',
								}}
								className='w-[15px] transition-all h-[15px] aspect-1 block  rounded-full'
							></div>
						))}
					</div>

					<div
						className='cursor-pointer hover:opacity-80 active:opacity-50 transition-all'
						onClick={prev}
					>
						<SliderArrow width={20} height={20} fill='#0F91D6' />
					</div>
				</div>
			</div>
		</div>
	)
}
