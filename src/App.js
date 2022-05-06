import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { collection, onSnapshot, db } from './lib/firebaseDatabase';
import CreateNote from './components/CreateNote';
import ShowNotes from './components/ShowNotes';
import Title from './components/Title'
import style from './css/style.module.css'
import './css/global.css'
function App() {
  let [notes, setNotes] = useState([])


  useEffect(() => {
    let collections = collection(db, 'reactnotes')
    let unsubscribe = onSnapshot(collections, (data) => {
      console.log(data.docs)
      setNotes(data.docs.map(x => ({ ...x.data(), id: x.id })).sort((a, b) => b.edited_at.seconds - a.edited_at.seconds))
    })
    return () => {
      unsubscribe()
    }
  }, [])

  let showAllNotes = () => {

    return <ShowNotes notes={notes} />
  }
  return <Container className={`${style.container_fix} my-5 `}>
    {!notes.length ? <Row>
      <Col className='text-center'>
        <Spinner animation="border" />
      </Col>
    </Row> : <div>
      <Row>
        <Col>
          <Title />
        </Col>
      </Row>
      <Row>
        <Col md={12} className='text-center'>
          <CreateNote />
        </Col>
        {showAllNotes()}
      </Row>
    </div>}
    {/* <ShowNotes /> */}

  </Container>
}

export default App;
