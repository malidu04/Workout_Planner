import { useContext } from "react"
import { AuthContext } from "../../authContext"
import useFetch from "../../useFetch"

const Entries = () => {

    const { user } = useContext(AuthContext)
    const { data } = useFetch(`/entries/${user._id}`)

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        return formattedDate;
    }

    return (
        <div className="entry">
            <Navbar />

            <div className="entriesContainer">
                {
                    data?.map((d, index) => (
                        <div className="entryItem" key={index}>
                            <h1>{formatDate(d.date)}</h1>
                            <h2>Meals Taken</h2>
                            <div className="mealsContainer">
                                {d?.meals?.map((m, i) => (
                                    <div className="mealItem" key={i}>{m.name}</div>
                                ))}
                        </div>
                    </div>
                    ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default Entires