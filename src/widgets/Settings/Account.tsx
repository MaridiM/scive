import { avatarImage } from '@/shared/assets'
import { ChangeTextSize, Typography, UserAvatar } from '@/shared/components'

// }
export const Account = () => {
    const user = {
        user: 'hanna@scive.ai'
    }

    return (
        <div className='ml-[44px] flex-col pt-[20px]' style={{ gap: 64 }}>
            <div className='flex items-center' style={{ gap: 52 }}>
                <div className='w-[416px] rounded-base-x4 bg-gray-100 p-2'>
                    <UserAvatar size={'lg'} src={avatarImage.src} username={'user.user'} />
                </div>
                <Typography variant='body'>
                    Current plan: <Typography className='font-bold'>Basic</Typography>, active till{' '}
                    <Typography className='font-bold text-sky'>09.27.2023</Typography>
                </Typography>
            </div>
            <div className='mt-[64px] flex w-[416px] justify-between'>
                <div className='mr-[20px] flex flex-col'>
                    <Typography variant='h4'>Font size</Typography>
                    <Typography className='text-base-body4 text-gray-400'>
                        Available only for screens with a width of 1440 and more
                    </Typography>
                </div>

                <div className='flex'>
                    <ChangeTextSize />
                </div>
            </div>
        </div>
    )
}
