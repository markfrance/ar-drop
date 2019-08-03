 <Image 
            source={require("../../public/images/CryptoClash-Leaderboard-Wave.png")}
            style={localStyles.waveImage} />
          <Text style={localStyles.yourPosition}> Your Position </Text>
          <Text style={localStyles.positionText}> 3rd </Text>

          <TouchableHighlight style={localStyles.playAgain}
            onPress={() => this.props.navigation.navigate('Airdrop')}
             >
             <Image source={require("../../public/images/CryptoClash-Leaderboard-Play-Again-Button.png")}
              style={localStyles.playAgainButton}
               />
              
          
          </TouchableHighlight>
           <TouchableHighlight
           style={localStyles.backArrow} 
            onPress={() => this.props.navigation.navigate('Airdrop')}
             >
             <Image source={require("../../public/images/CryptoClash-Back-Arrow.png")}
              style={localStyles.backArrowButton} />
          
          </TouchableHighlight>



 <Image source={require('../../public/images/CryptoClash-Wave.png')}
        style={localStyles.wave}/>
