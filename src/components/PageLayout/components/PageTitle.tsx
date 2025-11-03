interface Props {
    title: string
}

const PageTitle = (props: Props) => {
    return (
        <h1 className="font-semibold text-[25px] py-4 text-base-content/80">{props.title}</h1>
    )
}

export default PageTitle;