import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchClass from "./SearchClass";
import ClassList from "./ClassList";

function HomePage() {
    const [classes, setClasses] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get("https://be-bw-anywherefitness.herokuapp.com/api/classes")
            .then(res => {
                console.log(res.data);
                setClasses(res.data);
            });
    }, []);

    const handleChange = event => {
        setSearch(event.target.value);
    };

    const result = classes.filter(search => {
        return search.title.toLowerCase().includes(search);
    });

    return (
        <div>
            <center>
                <SearchClass value={search} onChange={handleChange} />
            </center>
            {result.map(props => {
                return (
                    <ClassList
                        class_time={props.class_time}
                        class_date={props.class_date}
                        duration={props.duration}
                        location={props.location}
                        intensity={props.intensity}
                    />
                );
            })}
        </div>
    );
}

export default HomePage;
