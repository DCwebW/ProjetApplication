import ConseilsSport from "../components/screens/ConseilsSport";
import renderer from 'react-test-renderer'

describe('Contient des conseils', ()=>{
it("has 5 children", ()=>{
    const tree = renderer.create(<ConseilsSport/>).toJSON()
    expect(tree.children.length).toBe(1)
})

})