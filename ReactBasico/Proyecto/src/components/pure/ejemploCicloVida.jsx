class ejemploCicloVida extends Component {
    constructor(props) {
        super(props)
        console.log("Se ha creado la instancia del componente.")
    }

    componentWillMount() {
        console.log("Antes del montaje del componente.")
    }

    componentDidMount() {
        console.log("Justo antes de acabar de montar del componente antes de pintarlo.")
    }

    componentWillReceiveProps(nextProps) {
        console.log('Si va a recibir nuevas props');
    }

    /**
     * Controla si el componente debe o no actualizarse.
     * Devuelve TRUE o FALSE
     */
    shouldComponentUpdate(nextProps, nextState) {
        
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("Justo antes de que se actualice el componente");
    }

    componentDidUpdate(prevProps, nextState) {
        console.log("Justo después de actualizarse");
    }

    componentWillUnmount() {
        console.log("Aquí el componente se 'muere'.");
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }

}