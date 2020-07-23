import Hero from "components/hero/BackgroundAsImage"

export default ({fields}) => {

	console.log(fields)

	return (
		<Hero {...fields}/>
	)
}