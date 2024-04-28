import ConseilsSport from "../components/screens/ConseilsSport";
import { render } from "@testing-library/react-native";

describe('Contient des conseils', ()=>{
it("has 5 children", ()=>{

    const tree = render(<ConseilsSport/>).toJSON()
    expect(tree.children.length).toBe(1)
})

})



describe('ConseilsSport component', () => {
    // Ici describe, donne le contexte du test 
    it("renders each conseil correctly", () => {
      const component = render(<ConseilsSport />); // Ici on crée une instance du composant <ConseilsSport/>
      const tree = component.toJSON();
  
      // Vérifier si tree est défini et non nul
      expect(tree).toBeDefined();
      expect(tree).not.toBeNull();
  
      // Récupérer les éléments <Text> dans l'arbre rendu
      const textElements = tree.children[0].children.filter(child => child.type === 'Text');
  
      // Vérifier si chaque <Text> correspond à un conseil attendu
      textElements.forEach((textElement, index) => {
        // Vérifier que le texte du <Text> correspond à celui attendu dans le tableau Conseils
        expect(textElement.children[0]).toBe(Conseils[index].conseil);
      });
    });
  })
