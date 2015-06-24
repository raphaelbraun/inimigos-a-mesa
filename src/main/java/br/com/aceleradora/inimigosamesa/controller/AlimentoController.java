package br.com.aceleradora.inimigosamesa.controller;

import br.com.aceleradora.inimigosamesa.dao.AlimentoRepository;
import br.com.aceleradora.inimigosamesa.dao.CategoriaRepository;
import br.com.aceleradora.inimigosamesa.model.Alimento;
import br.com.aceleradora.inimigosamesa.model.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collections;
import java.util.List;

@Controller
public class AlimentoController {

    @Autowired
    private AlimentoRepository repositorioAlimento;

    @Autowired
    private CategoriaRepository repositorioCategoria;



    @RequestMapping(value = "/lista", method = RequestMethod.GET)
    public String listar(
            @RequestParam(value = "opcao-ordenar", required = false, defaultValue = "cre") String tipoDeOrdenacao,
            Alimento alimento,
            Model model) {


        List<Alimento> alimentos = (List<Alimento>) repositorioAlimento.findAll();
        alimentos = ordenar(alimentos,tipoDeOrdenacao);

        model.addAttribute("alimentos", alimentos);

        return "lista";
    }


    @RequestMapping(value = "/busca", method = RequestMethod.GET)
    public String busca(Alimento alimento, Model model) {

        List<Alimento> alimentosBanco = repositorioAlimento.buscaAlimentoPorNomeSemAcentos(alimento.getNome() + "%");

        if (!alimentosBanco.isEmpty()) {
            model.addAttribute("alimentos", alimentosBanco);
        } else {
            model.addAttribute("erro", "Nenhum alimento encontrado!");
        }

        return "lista";
    }

    @RequestMapping(value = "/buscaCategoria", method = RequestMethod.GET)
    public String buscaPorCategoria(@RequestParam(value = "categoria") String parametros,
                                    Model model) {
        model.addAttribute("alimento", new Alimento());

        String divideparametros[] = parametros.split("-");

        Categoria categoria = repositorioCategoria.findOne(Integer.parseInt(divideparametros[0]));


        if(categoria == null){
            model.addAttribute("erro", "Nenhuma categoria encontrada!");
            return "lista";
        }

        List<Alimento> alimentosCategoria = categoria.getAlimentos();

        if(divideparametros.length>1){
            if(divideparametros[1].equals("cre")){
                Collections.sort(alimentosCategoria);
            }else if(divideparametros[1].equals("decre")){
                Collections.sort(alimentosCategoria);
                Collections.reverse(alimentosCategoria);
            }
        }

        if(alimentosCategoria.isEmpty()){
            model.addAttribute("erro", "Nenhum alimento encontrado!");
            return "lista";
        }

        model.addAttribute("alimentos", alimentosCategoria);
        return "lista";
    }


    @RequestMapping(value = "/detalhe")
    public String detalhe(Model model, @RequestParam(value = "alimento", required = false) int codigo){

        Alimento alimento= repositorioAlimento.findOne(codigo);

        if(Double.parseDouble(alimento.getCalorias())>0 && Double.parseDouble(alimento.getCalorias())<=0.5){
            alimento.setCalorias("TR");
        }else if(alimento.getCalorias()==null){
            alimento.setCalorias("NA");
        }else{
            alimento.setCalorias(alimento.getCalorias()+" kcal");
        }

        if(Double.parseDouble(alimento.getAcucarGramas())>0 && Double.parseDouble(alimento.getAcucarGramas())<=0.5){
            alimento.setAcucarGramas("TR");
        }else if(alimento.getAcucarGramas()==null){
            alimento.setAcucarGramas("NA");
        }else{
            alimento.setAcucarGramas(alimento.getAcucarGramas()+" g");
        }

        if (Double.parseDouble(alimento.getSodioMiligramas())>0 && Double.parseDouble(alimento.getSodioMiligramas())<=0.5){
            alimento.setSodioMiligramas("TR");
        }else if(alimento.getSodioMiligramas()==null){
            alimento.setSodioMiligramas("NA");
        }else{
            alimento.setSodioMiligramas(alimento.getSodioMiligramas()+" mg");
        }

        if (Double.parseDouble(alimento.getGorduraGramas())>0 && Double.parseDouble(alimento.getGorduraGramas())<=0.5){
            alimento.setGorduraGramas("TR");
        }else if(alimento.getGorduraGramas()==null){
            alimento.setGorduraGramas("NA");
        }else{
            alimento.setGorduraGramas(alimento.getGorduraGramas()+" g");
        }

        model.addAttribute("alimento", alimento);

        return "detalhe";
    }


    public List<Alimento> ordenar(List<Alimento> alimentos, String tipoDeOrdenacao){
        if(tipoDeOrdenacao.equals("cre")){
            Collections.sort(alimentos);
        }else if(tipoDeOrdenacao.equals("decre")){
            Collections.sort(alimentos);
            Collections.reverse(alimentos);
        }
        return alimentos;
    }
}