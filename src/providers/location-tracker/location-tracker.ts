import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import {User} from "../user/user";
import {ToastController} from "ionic-angular";

@Injectable()
export class LocationTrackerProvider {
    public watch: any;
    public lat: number = 0;
    public lng: number = 0;
    private events: any;

    constructor(public zone: NgZone,
                private backgroundGeolocation: BackgroundGeolocation,
                private geolocation: Geolocation,
                public user: User,
                public toastCtrl: ToastController) {
    }

    startTracking(events) {
        this.events = events;

        // Background Tracking
        let config = {
            desiredAccuracy: 0,
            stationaryRadius: 20,
            distanceFilter: 10,
            debug: false,
            interval: 2000,
            notificationTitle: 'Beconnect',
            notificationText: 'Monitorando localização',
        };

        this.backgroundGeolocation.configure(config).subscribe((location) => {
            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.lat = location.latitude;
                this.lng = location.longitude;
                this.getLocations();
            });

        }, (err) => {
            console.log(err);
        });

        // Turn ON the background-geolocation system.
        this.backgroundGeolocation.start();

        // Foreground Tracking
        let options = {
            frequency: 3000,
            enableHighAccuracy: true
        };

        this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
            console.log(position);

            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
                this.getLocations();
            });

        });
    }

    stopTracking() {
        console.log('stopTracking');

        this.backgroundGeolocation.finish();
        this.watch.unsubscribe();
    }

    private getLocations() {
        // alert(this.lat + " - " + this.lng);

        for (let coordEvent of this.events.coords) {
            // alert(this.calculateDistance(this.lat, coordEvent.lat, this.lng, coordEvent.lng));
            //Se a latitude do usuário for igual a latitude do evento,
            // e se a longitude for igual a longitude do evento
            // if (this.lat == coordEvent.lat && this.lng == coordEvent.lng) {
            if (this.calculateDistance(this.lat, coordEvent.lat, this.lng, coordEvent.lng) < 0.5) { // 50 mts
                let start = coordEvent.startTime; //Horário de inicio do evento
                let start_hour = start.charAt(0) + start.charAt(1); //Hora de inicio do evento
                let start_minutes = start.charAt(3) + start.charAt(4); //Minuto de inicio do evento
                let end = coordEvent.endTime; //Hora de término do evento (Pode estar em branco)
                let date = new Date(); //object date
                let hour = date.getHours(); //Hora Atual
                let minutes = date.getMinutes(); //Minuto Atual

                // Se a hora atual for igual ao começo do evento, e alguns minutos após o início do evento
                if (hour == start_hour && minutes >= start_minutes) {
                    this.checkin(coordEvent);
                }

                // Se a hora atual for maior que a hora de início do evento
                else if (hour > start_hour) {
                    // Se não houver término previsto
                    if (end == "") {
                        this.checkin(coordEvent);
                    } else {
                        // Separa a hora final
                        let end_hour = end.charAt(0) + end.charAt(1);

                        // Separa o minuto final
                        let end_minutes = end.charAt(3) + end.charAt(4);

                        // Se a hora atual for menor que a hora de término
                        if (hour < end_hour) {
                            this.checkin(coordEvent);
                        }

                        // Na hora final alguns minutos antes
                        else if (hour == end_hour && minutes <= end_minutes) {
                            this.checkin(coordEvent);
                        }

                        // Na hora final do evento, porem alguns minutos depois do término
                        // ou
                        // algumas horas depois do fim,

                        // Pode retirar este 'else if', foi só para teste e deixar o código mais claro
                        // else if (hour == end_hour && minutes > end_minutes || hour > end_hour) {
                        //     console.log('check-in negado');
                        // }
                    }
                }

                // Antes da hora correta

                // Pode retirar este 'else', foi só para teste e deixar o código mais claro
                // else {
                //     console.log('check-in negado');
                // }

            }
        }
    }

    checkin(coordEvent) {
        this.events.coords = this.events.coords.filter(obj => obj !== coordEvent);

        this.user.checkin(coordEvent.event_id)
            .then((result: any) => {
                if (result.status) {
                    this.toastCtrl.create({
                        message: 'Checkin realizado com sucesso!',
                        duration: 3000,
                        position: 'top'
                    }).present();
                } else {
                    this.toastCtrl.create({
                        message: (result.msg ? result.msg : 'Não foi possível realizar o checkin.'),
                        duration: 3000,
                        position: 'top'
                    }).present();
                }
            })
            .catch((error: any) => {
                // this.toast.create({ message: 'Erro ao criar o usuário. Erro: ' + error.error, position: 'botton', duration: 3000 }).present();
            });
    }

    calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {
        let p = 0.017453292519943295;    // Math.PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
        return dis;
    }
}
