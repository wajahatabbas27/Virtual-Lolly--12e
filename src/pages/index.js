import { navigate } from "gatsby-link"
import React from "react"
import Header from "../components/Header"
import Lolly from "../components/Lolly"

export default function Home() {
  return (
    <div className="container">
      <Header />
      <div className="listLollies">
        <div>
          <Lolly
            fillLollyTop="#d52358"
            fillLollyMiddle="#e95946"
            fillLollyBottom="#deaa43"
          />
        </div>
        <div>
          <Lolly
            fillLollyTop="red"
            fillLollyMiddle="green"
            fillLollyBottom="blue"
          />
        </div>
        <div>
          <Lolly
            fillLollyTop="orange"
            fillLollyMiddle="pink"
            fillLollyBottom="purple"
          />
        </div>
      </div>
      <input
        type="button"
        value="Make a new Lolly to send to a friend"
        onClick={() => {
          navigate("/createNew")
        }}
      />
    </div>
  )
}
